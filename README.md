Comparador de IA

Ferramenta simples e direta para comparar respostas de diferentes modelos de Inteligência Artificial lado a lado.
Ideal para estudos, testes de desempenho, avaliações acadêmicas e validação de modelos.

1.Visão Geral:
O Comparador de IA é um sistema em Python que envia a mesma pergunta para múltiplas IAs e exibe as respostas juntas, permitindo analisar:
- Clareza
- Profundidade
- Velocidade
- Qualidade
- Consistência
- Ele serve tanto para comparar modelos diferentes quanto diferentes versões da mesma IA.
  
2.Funcionalidades:
- Envia a mesma pergunta para vários modelos
- Exibe respostas lado a lado
- Código simples e fácil de entender
- Suporte a múltiplas APIs (OpenAI, Gemini, Claude etc.)
- Permite adicionar novos modelos facilmente
- Ideal para testes e benchmarks

3.Tecnologias Utilizadas:
- Python 3.10+
- APIs de IA:
- OpenAI
- Google Gemini
- Anthropic Claude (opcional)
- Bibliotecas:
- requests
- json
- dotenv (opcional)

4. Como Instalar
Clone o repositório:
```sh
git clone https://github.com/CarlosEduardoGuimaraes/comparador-de-ia.git
cd comparador-de-ia
```
Instale dependências:
```sh
pip install -r requirements.txt
```
Se não tiver requirements, instale manualmente:
```sh
pip install requests python-dotenv
```

5. Configuração das APIs
```ini
Crie um arquivo .env na raiz com:
OPENAI_API_KEY=sua_chave
GEMINI_API_KEY=sua_chave
ANTHROPIC_API_KEY=sua_chave   # se usar
```

6.Como Executar:
```sh
python comparador.py
```
7.Estrutura do Projeto
```bash
comparador-de-ia/
│── comparador.py
│── README.md
│── .env (criado pelo usuário)
└── requirements.txt
```

8.Explicação do Código

Funções Principais
consultar_openai(pergunta):
- Envia a pergunta para a API da OpenAI e retorna o texto da resposta.
consultar_gemini(pergunta):
- Mesma lógica, mas usando a API da Google.
comparar(pergunta):
- Chama todas as funções acima e retorna um dicionário com as respostas ordenadas por modelo.
main():
- Ponto de entrada do programa.
- Pede a pergunta do usuário e imprime o resultado formatado.

9.Exemplo de Saída
```
=============================
        COMPARADOR IA
=============================

PERGUNTA:
"Explique o que é machine learning"

--------------------------------
OPENAI:
Machine learning é um campo da IA que...

--------------------------------
GEMINI:
Machine Learning é uma área que permite...

--------------------------------
CLAUDE:
Machine learning consiste em modelos estatísticos...
```
10. Arquitetura do Sistema
A aplicação Comparador de IA é totalmente baseada em tecnologias web nativas, sem uso de backend próprio. Sua arquitetura é simples, leve e focada em execução no navegador. Ela é composta pelos seguintes elementos:

10.1 Frontend (Interface do Usuário)
A interface é construída utilizando HTML, CSS e JavaScript, organizados da seguinte forma:

- HTML (index.html):
Estrutura toda a página, definindo os campos onde o usuário insere o prompt, os botões de ação e as áreas onde as respostas das IAs serão exibidas.

- CSS (style.css):
Responsável pelo design, cores, tipografia, espaçamento e responsividade da interface. Dá um visual limpo e organiza os elementos na tela.

- JavaScript (script.js):
Faz toda a lógica funcional do sistema, incluindo:
- Captura do prompt digitado pelo usuário
- Chamada às APIs das inteligências artificiais configuradas no projeto
- Tratamento das respostas
- Exibição do resultado lado a lado para comparação

10.2 Integração com APIs de IA
O JavaScript realiza requisições HTTP para as APIs das IAs configuradas (ex.: OpenAI, Google Gemini, Meta Llama, etc.).

As etapas são:
- Usuário digita um prompt.
- O JS envia esse texto para as APIs.
- As respostas são recebidas em formato JSON.
- O sistema exibe cada resposta em um bloco separado para comparação.

A aplicação não armazena dados e não possui backend próprio — tudo ocorre no navegador.

10.3 Estrutura de Pastas
```pgsql
comparador-de-ia/
│── index.html
│── style.css
│── script.js
└── README.md
```

11.Erros Comuns
- “API key inválida”:
Verificar se .env está correto.
- “Connection error”:
Rede da faculdade pode bloquear. Usar hotspot do celular.
- “Module not found”:
Instale bibliotecas:
```sh
pip install requests python-dotenv
```
12.Licença
MIT – Livre para copiar, modificar e distribuir.
 



