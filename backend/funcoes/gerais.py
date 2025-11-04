import os
import requests

url = "http://localhost:3000/imoveis"

def titulo(texto, simbolo="-"):
    os.system("clear")
    print("IMOBILIARIA AVENIDA")
    print(texto)
    print(simbolo*40)
    
def lista_imoveis_simplificada():
    imoveis = requests.get(url)
    titulo("Listagem de Imóveis")
    if imoveis.status_code == 200:
        for imovel in imoveis.json():
            print(f"""{imovel['id']} - {imovel['tipo']}
                {imovel['endereco']} - {imovel['bairro']}""")
    else:
        print("Erro ao listar imoveis")
