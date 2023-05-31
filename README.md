# fccoChatGPT
Something to burn all of those free credits.

## How to use the tool
Initial setup is required.  Create an OpenAI API key, and store it in a file called openai-key.txt.  After initial setup, the tool can be invoked using a web browser's JavaScript console.

### Usage
      chmod 755 ./app.sh
      ./app.sh

### Docker installation
Use the following steps to install Docker for a development environment:
1. sudo apt install docker.io
2. sudo systemctl enable --now docker
3. sudo usermod -aG docker $LOGNAME
4. sudo reboot

### Docker dev environment setup
Use the following steps to create a local development environment:
1. docker run -ti --rm -v /home/tom/VMware\_guestToHost\_sharedDir/working/:/lala ubuntu:20.04 bash
2. apt-get update
3. apt-get install -y nodejs npm git vim less curl nmon
4. cd /lala
5. git clone https://github.com/TMan253/fccoChatGPT.git
6. cd ./fccoChatGPT
9. vi myFile.txt
11. git add myFile.txt
12. git commit -m "My message."
13. git push origin master
