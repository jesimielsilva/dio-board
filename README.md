# DIO Board

Sistema de gerenciamento de Boards estilo Kanban, desenvolvido com **Angular** no front-end e **Spring Boot** no back-end. Permite criar boards, colunas e cards, além de mover cards entre colunas usando drag & drop.

---

## Tecnologias Utilizadas

### Front-end
- Angular 16
- Angular Material / CDK (Drag & Drop)
- TypeScript
- HTML5 & CSS3

### Back-end
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Jackson (JSON)

---

## Estrutura do Projeto

### Front-end
- `BoardHomeComponent`: lista todos os boards e gerencia seleção.
- `TelaBoardComponent`: exibe colunas e cards, permite drag & drop.
- `BoardService`: faz chamadas HTTP para o back-end (boards, colunas e cards).

### Back-end
- `BoardController`: endpoints para CRUD de boards.
- `ColunaController`: endpoints para CRUD de colunas.
- `CardController`: endpoints para CRUD de cards.
- `BoardService`, `ColunaService`, `CardService`: regras de negócio.
- `Board`, `Coluna`, `Card`: entidades JPA.

---

## Funcionalidades

- Criar, listar e selecionar boards
- Criar colunas e cards
- Drag & Drop de cards entre colunas
- Modal de criação de novo card
- Visualização de detalhes de cards
- Backend REST com persistência no banco de dados
- Estrutura de colunas padrão ao criar um novo board:
  - A Fazer
  - Em Progresso
  - Concluído
  - Cancelado

---

## Endpoints Back-end

### Boards
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | `/api/boards` | Lista todos os boards |
| GET    | `/api/boards/{id}` | Retorna um board pelo ID |
| POST   | `/api/boards` | Cria um novo board |

### Colunas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | `/api/colunas/board/{boardId}` | Lista colunas de um board |
| POST   | `/api/colunas` | Cria uma nova coluna |

### Cards
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | `/api/cards/coluna/{colunaId}` | Lista cards de uma coluna |
| POST   | `/api/cards/coluna/{colunaId}` | Cria um novo card |
| PUT    | `/api/cards/{cardId}/mover/{novaColunaId}` | Move card para outra coluna |

---

## Executando o Projeto

### Back-end
1. Configurar o banco de dados (`application.properties`)
2. Rodar a aplicação Spring Boot:
```bash
./mvnw spring-boot:run
```
## Front-end

### Instalar dependências:
```bash
npm install
```
## Rodar a aplicação Angular

```bash
ng serve
```
### Acessar no navegador

[http://localhost:4200](http://localhost:4200)

---

### Observações

- O modal de criação de card é integrado no **TelaBoardComponent**.  
- Drag & Drop usa `@angular/cdk/drag-drop`.  
- As colunas são carregadas do back-end e os cards podem ser movidos entre elas.  
- Ao criar um novo board, colunas padrão são criadas automaticamente.  

---

### Autor

**Seu Nome**  
GitHub: [https://github.com/jesimiel](https://github.com/jesimielsilva)


