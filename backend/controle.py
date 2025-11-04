import requests

# import de funcoes que estão em outros arquivos/diretorios
from funcoes.gerais import titulo
from funcoes.menu_controle import menu_imoveis, menu_vendas, menu_pesquisas, menu_graficos, menu_utilitarios

url = "http://json_db:80"

while True:
    titulo("Controle de Imóveis e Vendas", "=")
    print("""
        
        1. Castro de Imóveis
        2. Cadastro de Vendas
        3. Pesquisas Avancadas
        4. Gráficos
        5. Utilitários
        6. Finalizar
        
        """)
    opcao = int(input("Opcão: "))
    
    if opcao == 1:
        menu_imoveis()
    elif opcao == 2:
        menu_vendas()
    elif opcao == 3:
        menu_pesquisas()
    elif opcao == 4:
        menu_graficos()
    elif opcao == 5:
        menu_utilitarios()
    elif opcao == 6:    
        break

    input("Pressione ENTER para continuar...")
