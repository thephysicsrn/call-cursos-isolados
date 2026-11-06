#!/usr/bin/env python3
import os
import sys
import ftplib
import getpass

FTP_HOST = "ftp.callnatal.hospedagemdesites.ws"
FTP_USER = "callnatal"
REMOTE_ROOT = "public_html"
LOCAL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

def main():
    password = os.environ.get("FTP_PASS")
    if len(sys.argv) > 1:
        password = sys.argv[1]
    
    if not password:
        password = getpass.getpass(f"Digite a senha de FTP do usuário '{FTP_USER}': ")

    print(f"\nConectando a {FTP_HOST}...")
    ftp = ftplib.FTP()
    try:
        ftp.connect(FTP_HOST, 21, timeout=30)
        print("Conexão estabelecida! Autenticando...")
        ftp.login(FTP_USER, password)
        print("Autenticação bem-sucedida!")
    except ftplib.error_perm as e:
        print(f"\n❌ Erro de autenticação: Senha de FTP incorreta para o usuário '{FTP_USER}'.")
        print("Dica: Você pode redefinir a senha no painel da Locaweb em 'Alterar senha' na aba Arquivos e FTP.")
        return
    except Exception as e:
        print(f"\n❌ Erro ao conectar ao servidor FTP: {e}")
        return

    # Ativar modo passivo
    ftp.set_pasv(True)

    # Entrar em public_html
    try:
        ftp.cwd(REMOTE_ROOT)
        print(f"Diretório atual: {ftp.pwd()}")
    except Exception as e:
        print(f"Erro ao acessar {REMOTE_ROOT}: {e}")
        return

    # Fazer upload recursivo de dist
    print(f"\nIniciando upload dos arquivos de {LOCAL_DIR} para {REMOTE_ROOT}...")

    def upload_dir(local_path, remote_sub=""):
        for item in sorted(os.listdir(local_path)):
            if item.startswith(".DS_Store"):
                continue
            l_item_path = os.path.join(local_path, item)
            r_item_path = (remote_sub + "/" + item).lstrip("/") if remote_sub else item

            if os.path.isdir(l_item_path):
                # Criar pasta remota se nao existir
                try:
                    ftp.mkd(item)
                    print(f"📁 Criada pasta: {r_item_path}")
                except Exception:
                    pass  # Pasta ja existe
                ftp.cwd(item)
                upload_dir(l_item_path, r_item_path)
                ftp.cwd("..")
            else:
                file_size = os.path.getsize(l_item_path)
                size_str = f"{file_size / (1024*1024):.2f} MB" if file_size > 1024*1024 else f"{file_size / 1024:.1f} KB"
                try:
                    remote_size = ftp.size(item)
                    if remote_size == file_size:
                        print(f"⏩ Mantendo: {r_item_path} ({size_str}) - inalterado")
                        continue
                except Exception:
                    pass
                print(f"⬆️  Enviando: {r_item_path} ({size_str})...", end="", flush=True)
                with open(l_item_path, "rb") as f:
                    ftp.storbinary(f"STOR {item}", f, blocksize=65536)
                print(" ✅ OK!")

    upload_dir(LOCAL_DIR)
    ftp.quit()
    print("\n🎉 Upload concluído com sucesso!")
    print("O site já está publicado em: https://www.callnatal.com.br")

if __name__ == "__main__":
    main()
