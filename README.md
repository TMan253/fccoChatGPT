# fccoChatGPT
Something to burn all of those free credits.

## How to use the tool
Initial setup is required.  Create an OpenAI API key, and store it in a file called openai-key.txt.  Create a js-chatgpt-clone/.env file with a variable in it defined as API_KEY=*your API key here*.  Copy the js-chatgpt-clone/.env file into react-dalle-clone/.  After initial setup, the tool can be invoked using a web browser's JavaScript console.

### Usage
      chmod 755 ./app.sh ./dalleApp.sh
      ./app.sh
      ./dalleApp.sh
      cd js-chatgpt-clone
      npm run start:backend
      npm run start:frontend
      http://localhost:3000
      cd ../react-dalle-clone
      npm run start:backend
      npm run start:frontend
      http://localhost:3000

### Docker installation
Use the following steps to install Docker for a development environment:
1. sudo apt install docker.io
2. sudo systemctl enable --now docker
3. sudo usermod -aG docker $LOGNAME
4. sudo reboot

### Docker dev environment setup
Use the following steps to create a local development environment:
1. docker run -ti --rm -v /home/tom/VMware\_guestToHost\_sharedDir/working/:/lala -p 3000:3000 -p 8000:8000 ubuntu:20.04 bash
2. apt-get update
3. apt-get install -y git vim less curl nmon
4. cd /lala
5. git clone https://github.com/TMan253/fccoChatGPT.git
6. cd ./fccoChatGPT
7. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
8. export NVM_DIR="$HOME/.nvm"
9. [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
10. [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
11. nvm install 14
12. cd ./js-chatgpt-clone
13. npm install
14. npm run start:frontend
15. npm run start:backend
16. vi myFile.txt
17. git add myFile.txt
18. git commit -m "My message."
19. git push origin master
