# Mindsounds
Parte do trabalho de G2 para a disciplina INF1407 da PUC-Rio desenvolvido por mim (Thomas Mergener).

## Descrição geral
Este repositório contém o front-end para o projeto Mindsounds.

Mindsounds consiste em um simples clone de Twitter.

## Executando o backend

### Pré-requisitos

- Docker

### Configurações

O arquivo `site/lib/environment.ts` contém as configurações de ambiente do projeto (por ora, apenas `apiUrl`).
Caso seja utilizado um endereço diferente do padrão para o backend -- e/ou este seja executado em um host distinto, altere o valor da variável `apiUrl` para o endereço correto.

### Executando o projeto

Para executar o projeto, execute o comando na raíz do repositório:

```bash
docker compose up
```




