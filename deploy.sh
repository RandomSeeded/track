aws ecr get-login --no-include-email --profile RandomSeed | /bin/bash
docker build -t randomseed .
docker tag randomseed:latest 463792394146.dkr.ecr.us-east-2.amazonaws.com/randomseed:latest
docker push 463792394146.dkr.ecr.us-east-2.amazonaws.com/randomseed:latest
