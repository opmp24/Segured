// Admin UI: sign-in, upload gallery images, upload documents, manage approvals
(function(){
  function el(id){return document.getElementById(id)}
  const loginBtn = el('login-google');
  const logoutBtn = el('logout');
  const authStatus = el('auth-status');
  const galleryFile = el('gallery-file');
  const uploadGallery = el('upload-gallery');
  const galleryStatus = el('gallery-upload-status');
  const docFile = el('doc-file');
  const docPublic = el('doc-public');
  const uploadDoc = el('upload-doc');
  const docStatus = el('doc-upload-status');
  const approvedList = el('approved-list');
  const useGithub = el('use-github');
  const githubToken = el('github-token');
  const adminPass = el('admin-pass');
  const adminUnlock = el('admin-unlock');
  const docUseGithub = el('doc-use-github');

  let unlocked = false;

  if (!window.firebase) {
    authStatus.innerText = 'Firebase no configurado. Copie firebase-config.example.js a firebase-config.js y ponga sus credenciales.';
  } else {
    firebase.initializeApp && firebase.initializeApp(firebaseConfig);
  }
  const auth = window.firebase?.auth?.() || null;
  const storage = window.firebase?.storage?.() || null;
  const db = window.firebase?.firestore?.() || null;

  function renderUser(user){
    if (!auth) return;
    if (user){
      authStatus.innerText = `Conectado como ${user.email}`;
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    } else {
      authStatus.innerText = 'No autenticado';
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
    }
  }

  auth?.onAuthStateChanged(u => renderUser(u));

  loginBtn?.addEventListener('click', ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(err=>alert(err.message));
  });
  logoutBtn?.addEventListener('click', ()=>auth.signOut());

  adminUnlock?.addEventListener('click', ()=>{
    // simple client-side admin password check using github-config (example)
    if (!window.GITHUB_CONFIG){
      alert('Cree github-config.js desde github-config.example.js y configure adminPassword');
      return;
    }
    if (adminPass.value === window.GITHUB_CONFIG.adminPassword){
      unlocked = true; authStatus.innerText = authStatus.innerText + ' — Admin desbloqueado';
    } else alert('Contraseña incorrecta');
  });

  uploadGallery.addEventListener('click', async ()=>{
    if (!unlocked){ return galleryStatus.innerText = 'Debes desbloquear admin con contraseña.'}
    const file = galleryFile.files[0];
    if (!file) return galleryStatus.innerText = 'Seleccione una imagen.';
    galleryStatus.innerText = 'Subiendo...';
    try{
      if (useGithub.checked){
        if (!window.GITHUB_CONFIG) return galleryStatus.innerText = 'Falta github-config.js';
        const token = githubToken.value;
        if (!token) return galleryStatus.innerText = 'Introduce tu PAT de GitHub.';
        // upload to GitHub repo via REST API
        const path = `${window.GITHUB_CONFIG.galleryPath}/${Date.now()}_${file.name}`;
        const url = `https://api.github.com/repos/${window.GITHUB_CONFIG.owner}/${window.GITHUB_CONFIG.repo}/contents/${encodeURIComponent(path)}`;
        const content = await file.arrayBuffer();
        const b64 = btoa(String.fromCharCode(...new Uint8Array(content)));
        // check if exists to get sha
        let sha = null;
        const getResp = await fetch(url + `?ref=${window.GITHUB_CONFIG.branch}`, {headers:{Authorization:`token ${token}`}});
        if (getResp.status===200){ const body=await getResp.json(); sha=body.sha }
        const resp = await fetch(url, {method:'PUT', headers:{Authorization:`token ${token}`, 'Content-Type':'application/json'}, body: JSON.stringify({message:`Add image ${file.name}`, branch: window.GITHUB_CONFIG.branch, content: b64, sha})});
        if (!resp.ok) throw new Error('GitHub upload failed: '+resp.status);
        galleryStatus.innerText = 'Imagen subida al repositorio.';
      } else {
        const ref = storage.ref().child(`gallery/${Date.now()}_${file.name}`);
        const snap = await ref.put(file);
        const url = await ref.getDownloadURL();
        await db.collection('gallery').add({url, name: file.name, created: firebase.firestore.FieldValue.serverTimestamp()});
        galleryStatus.innerText = 'Imagen subida a Firebase.';
      }
    }catch(e){galleryStatus.innerText = 'Error: '+e.message}
  });

  uploadDoc.addEventListener('click', async ()=>{
    if (!unlocked){ return docStatus.innerText = 'Debes desbloquear admin con contraseña.'}
    const file = docFile.files[0];
    if (!file) return docStatus.innerText = 'Seleccione un archivo.';
    docStatus.innerText = 'Subiendo...';
    try{
      if (docUseGithub.checked){
        if (!window.GITHUB_CONFIG) return docStatus.innerText = 'Falta github-config.js';
        const token = githubToken.value;
        if (!token) return docStatus.innerText = 'Introduce tu PAT de GitHub.';
        const path = `${window.GITHUB_CONFIG.documentsPath}/${Date.now()}_${file.name}`;
        const url = `https://api.github.com/repos/${window.GITHUB_CONFIG.owner}/${window.GITHUB_CONFIG.repo}/contents/${encodeURIComponent(path)}`;
        const content = await file.arrayBuffer();
        const b64 = btoa(String.fromCharCode(...new Uint8Array(content)));
        let sha = null;
        const getResp = await fetch(url + `?ref=${window.GITHUB_CONFIG.branch}`, {headers:{Authorization:`token ${token}`}});
        if (getResp.status===200){ const body=await getResp.json(); sha=body.sha }
        const resp = await fetch(url, {method:'PUT', headers:{Authorization:`token ${token}`, 'Content-Type':'application/json'}, body: JSON.stringify({message:`Add doc ${file.name}`, branch: window.GITHUB_CONFIG.branch, content: b64, sha})});
        if (!resp.ok) throw new Error('GitHub upload failed: '+resp.status);
        // add metadata in Firestore if available
        if (db){ await db.collection('documents').add({url:`https://raw.githubusercontent.com/${window.GITHUB_CONFIG.owner}/${window.GITHUB_CONFIG.repo}/${window.GITHUB_CONFIG.branch}/${path}`, name:file.name, public: !!docPublic.checked, created: firebase.firestore.FieldValue.serverTimestamp()}) }
        docStatus.innerText = 'Documento subido al repositorio.';
      } else {
        const ref = storage.ref().child(`documents/${Date.now()}_${file.name}`);
        const snap = await ref.put(file);
        const url = await ref.getDownloadURL();
        const meta = {url, name:file.name, public: !!docPublic.checked, created: firebase.firestore.FieldValue.serverTimestamp()};
        const docRef = await db.collection('documents').add(meta);
        docStatus.innerText = 'Documento subido a Firebase.';
      }
    }catch(e){docStatus.innerText = 'Error: '+e.message}
  });

  // List approved users
  async function loadApproved(){
    approvedList.innerText = 'Cargando...';
    try{
      const snap = await db.collection('approvedUsers').get();
      if (snap.empty){approvedList.innerText = 'No hay usuarios aprobados.';return}
      const items = [];
      snap.forEach(d=>items.push(`<div>${d.id} — ${d.data().email || ''}</div>`));
      approvedList.innerHTML = items.join('');
    }catch(e){approvedList.innerText = 'Error: '+e.message}
  }
  loadApproved();
})();
