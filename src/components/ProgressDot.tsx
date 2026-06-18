export default function ProgressDot({ index }: { index: number }) {
  return (
    <div
      className="d-none d-md-flex align-items-center justify-content-center"
      style={{
        position: 'absolute',
        right: 56,
        top: '50%',
        width: 25,
        height: 25,
        borderRadius: '50%',
        background: '#FFB600',
        zIndex: 4,
        transform: 'translateY(-50%)',
      }}
    >
      <span className="fw-bold text-dark" style={{ fontSize: '0.75rem' }}>
        {index + 1}
      </span>
    </div>
  )
}
