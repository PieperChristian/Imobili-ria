import requests
from funcoes.gerais import titulo, lista_imoveis_simplificada

url = "http://localhost:3000/vendas"

def incluir_vendas():
    titulo("Inclusão de Vendas")
    
    lista_imoveis_simplificada()
    
    print(f"\n Dados do Imóvel Vendido")
    
    imovelID = input(       "ID do imovel....: ")
    dataVenda = input(      "Data da venda...: ")
    valorPago = float(input("Valor pago......: "))
    comprador = input(      "Comprador.......: ")
    
    try:
        response = requests.post(url, json = {
            "imovelID": imovelID,
            "dataVenda": dataVenda,
            "valorPago": valorPago,
            "comprador": comprador
        })
        
        if response.status_code == 201:
            response = requests.put(url + "/" + imovelID, json = {
                "status": "v"
            })
            print("Venda cadastrada com sucesso")
        else:
            print("Erro ao incluir venda")
    except:
        print("Erro ao incluir venda")
    
    input("Pressione ENTER para continuar...")

def alterar_vendas():
    pass

def excluir_vendas():
    pass

def listar_vendas():
    pass
