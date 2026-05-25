const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function authHeaders() {
  const token = localStorage.getItem('mitots_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function login(username, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Invalid credentials')
  }
  return res.json()
}

export async function getHealth() {
  const res = await fetch(`${API}/api/health`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Backend offline')
  return res.json()
}

export async function generate(module, prompt) {
  const res = await fetch(`${API}/api/generate`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ module, prompt }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Generation failed')
  }
  return res.json()
}

export async function getDocuments() {
  const res = await fetch(`${API}/api/documents`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch documents')
  return res.json()
}

export async function deleteDocument(id) {
  const res = await fetch(`${API}/api/documents/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete document')
  return res.json()
}

export async function getModules() {
  const res = await fetch(`${API}/api/modules`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch modules')
  return res.json()
}

export async function createModule(data) {
  const res = await fetch(`${API}/api/modules`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create module')
  return res.json()
}

export async function deleteModule(id) {
  const res = await fetch(`${API}/api/modules/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete module')
  return res.json()
}
