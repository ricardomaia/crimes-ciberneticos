# Guia de Atualização do Projeto

Este documento fornece instruções detalhadas sobre como atualizar os arquivos de dados do projeto de crimes cibernéticos.

## 1. Arquivo data.json

O arquivo `data.json` contém um array de objetos, onde cada objeto representa uma situação de crime cibernético com a seguinte estrutura:

```json
{
  "situacao": "Nome da situação",
  "palavrasChave": ["palavra1", "palavra2", "palavra3"],
  "dispositivos": [
    {
      "descricao": "Descrição do dispositivo legal",
      "url": "https://link-para-legislacao.gov.br"
    }
  ],
  "referencias": ["ref1", "ref2"],
  "tipo": "Típico|Atípico|Misto",
  "aspecto": "Aspecto da segurança afetado",
  "ambito": "Federal|Distrito Federal|Estado"
}
```

### Campos Obrigatórios

- **situacao**: Nome da situação (string)
- **dispositivos**: Array com pelo menos um dispositivo legal
- **tipo**: Classificação do tipo (string)
- **aspecto**: Aspecto de segurança (string)
- **ambito**: Âmbito jurisdicional (string)

### Campos Opcionais

- **palavrasChave**: Array de palavras-chave relacionadas
- **referencias**: Array de referências (ex: ["ref2", "ref5"])

### Como Adicionar uma Nova Situação

1. Abra o arquivo `data.json`
2. Localize o final do array (antes do `]` final)
3. Adicione uma vírgula após o último objeto
4. Insira o novo objeto seguindo a estrutura:

```json
{
  "situacao": "Nova Situação",
  "palavrasChave": ["palavra1", "palavra2"],
  "dispositivos": [
    {
      "descricao": "Descrição da lei - Código/Lei, artigo X",
      "url": "https://link-completo-para-legislacao"
    }
  ],
  "tipo": "Típico",
  "aspecto": "Confidencialidade",
  "ambito": "Federal"
}
```

## Como Editar uma Situação Existente

1. Localize o objeto que deseja editar no array
2. Modifique os campos necessários mantendo a estrutura JSON
3. Para adicionar/remover palavras-chave, edite o array `palavrasChave`
4. Para adicionar/remover dispositivos legais, edite o array `dispositivos`

## Exemplo Completo de Adição

Para adicionar "Deepfake":

```json
{
  "situacao": "Deepfake",
  "palavrasChave": ["Inteligência Artificial", "Falsificação", "Vídeo", "Áudio", "Imagem"],
  "dispositivos": [
    {
      "descricao": "Falsidade ideológica - Código Penal, art. 299",
      "url": "https://www.planalto.gov.br/ccivil_03/Decreto-Lei/Del2848.htm#art299"
    },
    {
      "descricao": "Calúnia - Código Penal, art. 138",
      "url": "https://www.planalto.gov.br/ccivil_03/Decreto-Lei/Del2848.htm#art138"
    }
  ],
  "referencias": ["ref1"],
  "tipo": "Atípico",
  "aspecto": "Autenticidade, Privacidade",
  "ambito": "Federal"
}
```

## Validação de URLs

Sempre verifique se as URLs dos dispositivos legais estão:
- Corretas e acessíveis
- Apontando para a seção específica da lei (use âncoras quando disponível)
- Usando HTTPS quando possível

## Referências

Para adicionar referências:
1. Use o formato `["ref1", "ref2"]` no campo `referencias`
2. As referências devem corresponder aos IDs na seção de referências do HTML
3. Exemplo: `"ref2"` aponta para `<a id="ref2">2</a>` no HTML

## Tipos Válidos

- **Típico**: Crimes expressamente tipificados na legislação
- **Atípico**: Condutas não tipificadas especificamente como crimes cibernéticos
- **Misto**: Situações que podem envolver tanto crimes típicos quanto atípicos

## Âmbitos Válidos

- **Federal**: Legislação federal
- **Distrito Federal**: Legislação específica do DF
- **Estado**: Legislação estadual (especifique o estado se necessário)

## Aspectos de Segurança Comuns

- Confidencialidade
- Integridade
- Disponibilidade
- Autenticidade
- Privacidade
- Proteção de Vulneráveis
- Violação de Política
- Danos à Reputação
- N/A (para casos não aplicáveis)

## Validação JSON

Antes de salvar, sempre valide o JSON:
1. Use um validador JSON online (jsonlint.com)
2. Verifique se todas as vírgulas, chaves e colchetes estão corretos
3. Certifique-se de que strings estão entre aspas duplas
4. Escape caracteres especiais quando necessário (ex: `\"` para aspas dentro de strings)

## Dicas Importantes

- **Backup**: Sempre faça backup antes de editar
- **Teste**: Teste a página após modificações
- **Consistência**: Mantenha consistência na nomenclatura
- **Encoding**: Use UTF-8 para caracteres especiais
- **Formatação**: Use indentação para melhor legibilidade

## Exemplo de Edição de Dispositivo

Para atualizar um dispositivo existente:

```json
// Antes
"dispositivos": [
  {
    "descricao": "Descrição antiga",
    "url": "https://url-antiga.gov.br"
  }
]

// Depois
"dispositivos": [
  {
    "descricao": "Descrição atualizada - Lei nº X/XXXX, art. Y",
    "url": "https://url-nova.gov.br#artY"
  }
]
```

## Solução de Problemas

**Erro de JSON inválido:**
- Verifique vírgulas em excesso ou faltantes
- Confirme que todas as chaves estão entre aspas duplas
- Verifique se arrays e objetos estão fechados corretamente

**Página não carrega dados:**
- Valide o JSON em um validador online
- Verifique o console do navegador para erros
- Confirme se o arquivo está no local correto

**Links quebrados:**
- Teste todas as URLs manualmente
- Use links permanentes quando disponível
- Adicione âncoras para seções específicas da legislação

## 2. Arquivo ref.json

O arquivo `ref.json` contém as referências organizadas que são utilizadas no projeto. Ele possui a seguinte estrutura:

```json
{
  "referencias": {
    "ref1": {
      "titulo": "Título da referência",
      "descricao": "Descrição detalhada da referência",
      "url": "https://link-para-recurso.com",
      "tipo": "legislacao|artigo|estudo|manual|jurisprudencia",
      "ambito": "federal|estadual|municipal|tecnico|internacional"
    }
  },
  "categorias": {
    "legislacao": "Descrição da categoria"
  },
  "ambitos": {
    "federal": "Descrição do âmbito"
  }
}
```

### Como Adicionar uma Nova Referência

1. Abra o arquivo `ref.json`
2. Localize a seção `"referencias"`
3. Adicione uma nova entrada seguindo o padrão:

```json
"refX": {
  "titulo": "Título da Nova Referência",
  "descricao": "Descrição clara e concisa",
  "url": "https://link-completo.com",
  "tipo": "legislacao",
  "ambito": "federal"
}
```

### Tipos de Referência Válidos

- **legislacao**: Leis, decretos, regulamentos
- **artigo**: Artigos científicos e acadêmicos
- **estudo**: Estudos técnicos e relatórios
- **manual**: Manuais e guias práticos
- **jurisprudencia**: Decisões judiciais

### Âmbitos Válidos para Referências

- **federal**: Legislação/normas nacionais
- **estadual**: Legislação estadual
- **municipal**: Legislação municipal
- **tecnico**: Documentos técnicos
- **internacional**: Tratados e normas internacionais

### Como Referenciar no data.json

No arquivo `data.json`, use o campo `referencias` para conectar situações às referências:

```json
{
  "situacao": "Nome da Situação",
  "referencias": ["ref2", "ref5"],
  ...
}
```

### Exemplo de Adição de Referência

```json
"ref11": {
  "titulo": "Marco Legal da Inteligência Artificial",
  "descricao": "PL 2.338/2023 que propõe regulamentação da IA no Brasil",
  "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2338724",
  "tipo": "legislacao",
  "ambito": "federal"
}
```

### Validação do ref.json

Antes de salvar, sempre:
1. Valide o JSON em um validador online
2. Verifique se as URLs estão funcionando
3. Confirme se os tipos e âmbitos estão corretos
4. Teste se as referências aparecem corretamente no site

### Integração com index.html

O arquivo `index.html` carrega automaticamente as referências do `ref.json`. As mudanças no arquivo JSON serão refletidas automaticamente na seção "Referências" do site.