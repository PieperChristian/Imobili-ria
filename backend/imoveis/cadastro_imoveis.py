import requests
from funcoes.gerais import titulo, lista_imoveis_simplificada

url = "http://json_db:80/imoveis"

def incluir_imoveis():
    titulo("Inclusão de Imóveis")
    
    tipo = input("          Tipo do imovel....: ")
    endereco = input("      Endereco..........: ")
    bairro = input("        Bairro............: ")
    preco = float(input("   Preco.............: "))
    detalhes = input("      Detalhes do Imóvel: ")
    
    try:
        response = requests.post(url, json = {
            "tipo": tipo,
            "endereco": endereco,
            "bairro": bairro,
            "preco": preco,
            "detalhes": detalhes,
            "status": "d"
        })
        
        if response.status_code == 201:
            print("Imovel cadastrado com sucesso")
        else:
            print("Erro ao incluir imovel")
            
    except:
        print("Erro ao incluir imovel")
    
    input("Pressione ENTER para continuar...")

def alterar_imoveis():
    titulo("Alteração de Imóveis")
    
    lista_imoveis_simplificada()
    
    print("Selecione o imovel a ser alterado")
    id = input("ID do imovel: ")
    
    response = requests.get(url + "/" + id)
    imovel_alterado = response.json()
    
    titulo("Informe novos dados ou ENTER para manter os anteriores")
    print(f"Tipo: {imovel_alterado['tipo']}")
    tipo = input("          Tipo do imovel....: ") or imovel_alterado['tipo']
    
    print(f"Endereco: {imovel_alterado['endereco']}")
    endereco = input("      Endereco..........: ") or imovel_alterado['endereco']
    
    print(f"Bairro: {imovel_alterado['bairro']}")
    bairro = input("        Bairro............: ") or imovel_alterado['bairro']
    
    print(f"Preco: {imovel_alterado['preco']}")
    preco = float(input("   Preco.............: ")) or imovel_alterado['preco']
    
    print(f"Detalhes: {imovel_alterado['detalhes']}")
    detalhes = input("      Detalhes do Imóvel: ") or imovel_alterado['detalhes']
    
    try:
        response = requests.put(url + "/" + id, json = {
            "tipo": tipo,
            "endereco": endereco,
            "bairro": bairro,
            "preco": preco,
            "detalhes": detalhes
        })
        
        if response.status_code == 200:
            print("Imovel alterado com sucesso")
        else:
            print("Erro ao alterar imovel")
        
    except:
        print("Erro ao alterar imovel")
    
    input("Pressione ENTER para continuar...")

def excluir_imoveis():
    titulo("Exclusão de Imóveis")
    

    lista_imoveis_simplificada()
    
    id = input("ID do imovel: ")
    
    try:
        response = requests.delete(url + "/" + id)
        
        if response.status_code == 200:
            print("Imovel excluido com sucesso")
        else:
            print("Erro ao excluir imovel")
        
    except:
        print("Erro ao excluir imovel")
    
    input("Pressione ENTER para continuar...")

def listar_imoveis():
    titulo("Listagem de Imóveis")
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            for imovel in response.json():
                print(f"""Id: {imovel['id']}
                    Tipo: {imovel['tipo']}
                    Endereco: {imovel['endereco']} - {imovel['bairro']}
                    Valor: R${imovel['preco']}
                    Detalhes: {imovel['detalhes']}
                    Status: {imovel['status']}""")
        else:
            print("Erro ao listar imoveis")
        
    except:
        print("Erro ao listar imoveis")
    
    input("Pressione ENTER para continuar...")
