// Função para gerar HTML das palavras-chave
function gerarPalavrasChave(palavrasChave) {
    if (!palavrasChave || palavrasChave.length === 0) return '';
    return `<i class='nota'>${palavrasChave.join(', ')}</i>`;
}

// Função para gerar HTML das referências
function gerarReferencias(referencias) {
    if (!referencias || referencias.length === 0) return '';
    return referencias.map(ref => `<sup><a href='#${ref}'>${ref.replace('ref', '')}</a></sup>`).join(' ');
}

// Função para gerar HTML dos dispositivos legais
function gerarDispositivos(dispositivos) {
    return dispositivos.map(dispositivo =>
        `<a href='${dispositivo.url}' target='_blank'>- ${dispositivo.descricao}</a>`
    ).join('<br />');
}

// Função para converter dados JSON em formato de array para DataTable
function converterDados(jsonData) {
    return jsonData.map(item => {
        const situacaoHtml = item.situacao +
            gerarReferencias(item.referencias) +
            '<br />' +
            gerarPalavrasChave(item.palavrasChave);

        const dispositivosHtml = gerarDispositivos(item.dispositivos);

        return [
            situacaoHtml,
            dispositivosHtml,
            item.tipo,
            item.aspecto,
            item.ambito
        ];
    });
}

// Função para carregar e renderizar referências
function carregarReferencias() {
    fetch('ref.json')
        .then(response => response.json())
        .then(refData => {
            const referenciaContainer = document.getElementById('section-referencias');
            let html = '';

            // Ordena as referências por ID
            const referencias = Object.entries(refData.referencias)
                .sort(([a], [b]) => {
                    const numA = parseInt(a.replace('ref', ''));
                    const numB = parseInt(b.replace('ref', ''));
                    return numA - numB;
                });

            referencias.forEach(([refId, refData]) => {
                const refNumero = refId.replace('ref', '');
                html += `
                    <p><a id="${refId}">${refNumero}</a> - ${refData.titulo}.
                    ${refData.descricao}.
                    <a href="${refData.url}" target="_blank">${refData.url}</a>
                    <span class="ref-meta"> (${refData.tipo} - ${refData.ambito})</span>
                    </p>
                `;
            });

            referenciaContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao carregar referências:', error);
            document.getElementById('section-referencias').innerHTML =
                '<p>Erro ao carregar referências. Verifique se o arquivo ref.json está disponível.</p>';
        });
}

// Carrega os dados do arquivo JSON externo
function inicializarTabela() {
    Promise.all([
        fetch('data.json').then(response => response.json()),
        fetch('ref.json').then(response => response.json())
    ])
        .then(([jsonData, refData]) => {
            // Converte os dados JSON para o formato de array
            const data = converterDados(jsonData);

            // Inicializa o DataTable com os dados convertidos
            let dt = new DataTable('#tbLegislacao', {
                data: data,
                language: {
                    url: '//cdn.datatables.net/plug-ins/2.0.2/i18n/pt-BR.json',
                },
                columnDefs: [{ className: 'situacao', targets: [0] }, { className: 'dispositivo', targets: [1] }],
                order: [[4, 'desc'], [0, 'asc']],
                pageLength: 8,
                select: true
            });

            // Carrega as referências
            carregarReferencias();
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}

// Função para controle do botão "voltar ao topo"
function inicializarBotaoTopo() {
    var btn = $('#toTop');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'fast', 'swing');
    });
}

// Função para controle do banner de cookies
function inicializarCookieBanner() {
    $(document).ready(function() {
        // Check if user has already made a choice about cookies
        const cookieConsent = localStorage.getItem('cookieConsent');

        // Show banner if no previous choice was made
        if (cookieConsent === null) {
            setTimeout(function() {
                $('#cookie-banner').addClass('show');
            }, 1000); // Show after 1 second
        } else if (cookieConsent === 'accepted') {
            // If cookies were accepted, ensure gtag is initialized
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        }

        // Handle accept button
        $('#cookie-accept').click(function() {
            localStorage.setItem('cookieConsent', 'accepted');
            $('#cookie-banner').removeClass('show');

            // Grant consent for analytics
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        });

        // Handle decline button
        $('#cookie-decline').click(function() {
            localStorage.setItem('cookieConsent', 'declined');
            $('#cookie-banner').removeClass('show');

            // Deny consent for analytics
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        });
    });
}

// Inicialização da aplicação
$(document).ready(function() {
    inicializarTabela();
    inicializarBotaoTopo();
    inicializarCookieBanner();
});