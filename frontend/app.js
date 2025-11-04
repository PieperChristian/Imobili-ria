// Frontend full CRUD + vendas
const listEl = document.getElementById('list')
const searchEl = document.getElementById('search')
const reloadBtn = document.getElementById('reload')
const btnAdd = document.getElementById('btn-add')

const formArea = document.getElementById('form-area')
const imovelForm = document.getElementById('imovel-form')
const fId = document.getElementById('imovel-id')
const fTipo = document.getElementById('f-tipo')
const fEndereco = document.getElementById('f-endereco')
const fBairro = document.getElementById('f-bairro')
const fPreco = document.getElementById('f-preco')
const fDetalhes = document.getElementById('f-detalhes')
const formCancel = document.getElementById('form-cancel')

const saleArea = document.getElementById('sale-area')
const saleForm = document.getElementById('sale-form')
const saleImovelId = document.getElementById('sale-imovel-id')
const sData = document.getElementById('s-data')
const sValor = document.getElementById('s-valor')
const sComprador = document.getElementById('s-comprador')
const saleCancel = document.getElementById('sale-cancel')

function apiBase() {
    const host = window.location.hostname || 'localhost'
    return `http://${host}:3030`
}

async function fetchImoveis() {
    try {
        const resp = await fetch(apiBase() + '/imoveis')
        if (!resp.ok) throw new Error('Erro na API')
        return await resp.json()
    } catch (e) {
        console.error(e)
        return []
    }
}

async function createImovel(payload) {
    const resp = await fetch(apiBase() + '/imoveis', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    return resp
}

async function updateImovel(id, payload) {
    const resp = await fetch(apiBase() + '/imoveis/' + encodeURIComponent(id), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    return resp
}

async function deleteImovel(id) {
    const resp = await fetch(apiBase() + '/imoveis/' + encodeURIComponent(id), { method: 'DELETE' })
    return resp
}

async function createVenda(payload) {
    const resp = await fetch(apiBase() + '/vendas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    return resp
}

async function patchImovel(id, payload) {
    const resp = await fetch(apiBase() + '/imoveis/' + encodeURIComponent(id), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    return resp
}

function formatPrice(v) {
    if (!v && v !== 0) return 'R$ 0,00'
    if (typeof v === 'string') v = Number(v.replace(/[^0-9.-]+/g, '')) || 0
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function escapeHtml(s) {
    if (s == null) return ''
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;" }[c]))
}

// Toast helper
function showToast(message, type = 'success', title = ''){
    try{
        const container = document.getElementById('toast-container')
        if(!container) return
        const t = document.createElement('div')
        t.className = 'toast ' + (type === 'error' ? 'error' : 'success')
        if(title) t.innerHTML = `<div class="title">${escapeHtml(title)}</div><div class="msg">${escapeHtml(message)}</div>`
        else t.innerHTML = `<div class="msg">${escapeHtml(message)}</div>`
        const close = document.createElement('button')
        close.className = 'close'
        close.innerText = '✕'
        close.addEventListener('click', ()=> { if(container.contains(t)) container.removeChild(t) })
        t.appendChild(close)
        container.appendChild(t)
        setTimeout(()=>{ if(container.contains(t)) container.removeChild(t) }, 4500)
    }catch(e){ console.error('toast error', e) }
}

function render(items) {
    listEl.innerHTML = ''
    if (!items || items.length === 0) {
        listEl.innerHTML = '<p>Nenhum imóvel encontrado.</p>'
        return
    }
    items.forEach(i => {
        const div = document.createElement('div')
        div.className = 'card'
        div.innerHTML = `
      <h3>${escapeHtml(i.tipo || 'Imóvel')} <small style="float:right;color:#6b7280">${escapeHtml(i.id)}</small></h3>
      <div class="meta">${escapeHtml(i.endereco || '')} - ${escapeHtml(i.bairro || '')}</div>
      <div class="price">${escapeHtml(formatPrice(i.preco))}</div>
      <div class="actions">
        <button class="primary" data-action="edit" data-id="${escapeHtml(i.id)}">Editar</button>
        <button data-action="delete" data-id="${escapeHtml(i.id)}">Excluir</button>
        ${i.status === 'v' ? '<span style="margin-left:auto;color:#16a34a;font-weight:700">VENDIDO</span>' : `<button data-action="sell" data-id="${escapeHtml(i.id)}">Vender</button>`}
      </div>
    `
        listEl.appendChild(div)
    })
}

reloadBtn.addEventListener('click', async () => {
    reloadBtn.disabled = true
    await loadAndRender()
    reloadBtn.disabled = false
})

searchEl.addEventListener('input', () => {
    const q = searchEl.value.trim().toLowerCase()
    const cards = Array.from(document.querySelectorAll('.card'))
    cards.forEach(card => {
        const text = card.textContent.toLowerCase()
        card.style.display = q === '' || text.includes(q) ? '' : 'none'
    })
})

btnAdd.addEventListener('click', () => {
    openAddForm()
})

function openAddForm() {
    fId.value = ''
    fTipo.value = ''
    fEndereco.value = ''
    fBairro.value = ''
    fPreco.value = ''
    fDetalhes.value = ''
    formArea.style.display = ''
    saleArea.style.display = 'none'
    window.scrollTo({ top: formArea.offsetTop - 20, behavior: 'smooth' })
}

function openEditForm(item) {
    fId.value = item.id
    fTipo.value = item.tipo || ''
    fEndereco.value = item.endereco || ''
    fBairro.value = item.bairro || ''
    fPreco.value = item.preco || ''
    fDetalhes.value = item.detalhes || ''
    formArea.style.display = ''
    saleArea.style.display = 'none'
    window.scrollTo({ top: formArea.offsetTop - 20, behavior: 'smooth' })
}

formCancel.addEventListener('click', (e) => {
    e.preventDefault()
    formArea.style.display = 'none'
})

saleCancel.addEventListener('click', (e) => {
    e.preventDefault()
    saleArea.style.display = 'none'
})

imovelForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const payload = {
        tipo: fTipo.value.trim(),
        endereco: fEndereco.value.trim(),
        bairro: fBairro.value.trim(),
        preco: Number(fPreco.value) || 0,
        detalhes: fDetalhes.value.trim(),
        status: 'd'
    }

    try {
        let resp
        if (fId.value) {
            resp = await updateImovel(fId.value, payload)
            if (resp && resp.ok) showToast('Imóvel atualizado', 'success')
            else showToast('Erro ao atualizar imóvel', 'error')
        } else {
            resp = await createImovel(payload)
            if (resp && resp.ok) showToast('Imóvel criado', 'success')
            else showToast('Erro ao criar imóvel', 'error')
        }
        formArea.style.display = 'none'
        await loadAndRender()
    } catch (err) {
        console.error(err)
        showToast('Erro ao salvar imóvel', 'error')
    }
})

saleForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const id = saleImovelId.value
    const payload = {
        imovelID: id,
        dataVenda: sData.value,
        valorPago: Number(sValor.value) || 0,
        comprador: sComprador.value.trim()
    }
    try {
        const resp = await createVenda(payload)
        if (resp && resp.ok) {
            // mark imovel as vendido
            await patchImovel(id, { status: 'v' })
            saleArea.style.display = 'none'
            showToast('Venda registrada', 'success')
            await loadAndRender()
        } else {
            showToast('Erro ao registrar venda', 'error')
        }
    } catch (err) {
        console.error(err)
        showToast('Erro ao registrar venda', 'error')
    }
})

// delegate actions from card buttons
listEl.addEventListener('click', async (e) => {
    const btn = e.target.closest('button')
    if (!btn) return
    const action = btn.getAttribute('data-action')
    const id = btn.getAttribute('data-id')
    if (action === 'edit') {
        // fetch item and open form
        const resp = await fetch(apiBase() + '/imoveis/' + encodeURIComponent(id))
        const item = await resp.json()
        openEditForm(item)
    } else if (action === 'delete') {
        if (confirm('Confirma exclusão deste imóvel?')) {
            const resp = await deleteImovel(id)
            if (resp && resp.ok) showToast('Imóvel excluído', 'success')
            else showToast('Erro ao excluir imóvel', 'error')
            await loadAndRender()
        }
    } else if (action === 'sell') {
        // open sale form
        saleImovelId.value = id
        const today = new Date().toISOString().slice(0, 10)
        sData.value = today
        sValor.value = ''
        sComprador.value = ''
        saleArea.style.display = ''
        formArea.style.display = 'none'
        window.scrollTo({ top: saleArea.offsetTop - 20, behavior: 'smooth' })
    }
})

async function loadAndRender() {
    listEl.innerHTML = '<p>Carregando...</p>'
    const items = await fetchImoveis()
    render(items)
}

loadAndRender()
