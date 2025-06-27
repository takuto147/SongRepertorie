```mermaid
classDiagram
    class User {
        +int id
        +string name
    }

    class Song {
        +int id
        +string title
    }

    User --> Song : owns


dfs