# avalon-checker
### Avalon node autorestarter
This script will auto-restart your avalon node when it detects that the node is crashed, or stuck, for example when all p2p connections dropped. If needed will also check for differences between the local node and the "remote" one, meaning that if you port-forward it thanks to an SSH or SSF tunnel, and only the forwarding or only the actual node crashed, it will restart the crashed service only.
Just be sure to place all the files in the correct paths or change the relevant paths inside the .service files and the scripts.