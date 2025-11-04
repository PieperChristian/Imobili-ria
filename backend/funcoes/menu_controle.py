from funcoes.gerais import titulo
from imoveis.cadastro_imoveis import incluir_imoveis, alterar_imoveis, excluir_imoveis, listar_imoveis
from vendas.cadastro_vendas import incluir_vendas, alterar_vendas, excluir_vendas, listar_vendas

def menu_imoveis():
    while True:
        titulo("Cadastro de Imóveis")
        print("""
        
            1. Incluir
            2. Alterar
            3. Excluir
            4. Listar
            5. Retornar
            
            """)
        opcao = int(input("Opcão: "))
        if opcao == 1:
            incluir_imoveis()
        elif opcao == 2:
            alterar_imoveis()
        elif opcao == 3:
            excluir_imoveis()
        elif opcao == 4:
            listar_imoveis()
        elif opcao == 5:
            break

def menu_vendas():
    while True:
        titulo("Cadastro de Vendas")
        print("""
        
            1. Incluir
            2. Alterar
            3. Excluir
            4. Listar
            5. Retornar
            
            """)
        opcao = int(input("Opcão: "))
        if opcao == 1:
            incluir_vendas()
        elif opcao == 2:
            alterar_vendas()
        elif opcao == 3:
            excluir_vendas()
        elif opcao == 4:
            listar_vendas()
        elif opcao == 5:
            break

def menu_pesquisas():
    pass

def menu_graficos():
    pass

def menu_utilitarios():
    pass
