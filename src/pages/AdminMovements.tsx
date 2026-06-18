import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

interface Movement {
  id: number
  product_id: number
  type: string
  quantity: number
  note: string
  created_at: string
}

export default function AdminMovements() {
  const [movements, setMovements] = useState<Movement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('stock_movements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (data) setMovements(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status" />
      </div>
    )
  }

  const typeBadge = (t: string) => {
    const map: Record<string, string> = {
      ingreso: 'bg-success',
      venta: 'bg-primary',
      eliminacion: 'bg-danger',
    }
    return map[t] || 'bg-secondary'
  }

  return (
    <div>
      <h3 className="mb-4">Movimientos de Stock</h3>
      <div className="table-responsive">
        <table className="table table-hover bg-white rounded shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Nota</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.product_id}</td>
                <td>
                  <span className={`badge ${typeBadge(m.type)}`}>{m.type}</span>
                </td>
                <td>{m.quantity}</td>
                <td>{m.note}</td>
                <td>{new Date(m.created_at).toLocaleString('es-CL')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {movements.length === 0 && (
          <p className="text-muted text-center py-3">Sin movimientos registrados</p>
        )}
      </div>
    </div>
  )
}
