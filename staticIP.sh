#!/bin/bash

getinfo()
{ 
  read -p "Number of interfaces(not include eth0): " interfacesnum
  
  
  
}

writeinterfacefile()
{ 
cat << EOF > $1 
# This file describes the network interfaces available on your system
# interfaces(5) file used by ifup(8) and ifdown(8)
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback
 
EOF
#don't use any space before of after 'EOF' in the previous line

for i in $(seq 0 $2); do
  read -p "[eth$i] Enter the IP address for your interface:   " staticip
  read -p "[eth$i] Enter the netmask for your network:   (looks like 255.255.255.0) " netmask
  
  

    echo "auto eth$i" >> $1
    echo "iface eth$i inet static" >> $1
    echo "address $staticip" >> $1
    echo "netmask $netmask" >> $1
    if [[ $i -eq 0 ]]; then
    read -p "[eth$i] Enter the IP address of your gateway:    " gateway
  read -p "[eth$i] Enter the dns-nameservers: " dns_nameservers
        echo "gateway $gateway" >> $1
        echo "dns-nameservers $dns_nameservers" >> $1
    fi
    echo "" >> $1
    
 
done
for i in $(seq 0 $2); do
    sudo ifconfig eth$i down
    if sudo ifconfig eth$i down ; then
      #sudo ifconfig eth$i down
      echo "ifconfig eth$i down"
    fi
    sudo ifconfig eth$i up
    if sudo ifconfig eth$i up ; then
      #sudo ifconfig eth$i up
      echo "ifconfig eth$i up"
    fi
done  
  echo ""
  echo "Your informatons was saved in '$1' file."
  echo ""
  exit 0
}

file="/etc/network/interfaces"
if [ ! -f $file ]; then
  echo ""
  echo "The file '$file' doesn't exist!"
  echo ""
  exit 1
fi

clear
echo "Let's set up a static ip address for your site"
echo ""

getinfo
echo ""
#echo "So your settings are:"
#echo "The gateway is:   $gateway"
#echo "The Mask for the Network is:   $netmask"
#echo "Your interface's address:   $staticip"
#echo "Your dns-nameservers is:   $dns_nameservers"
#echo ""

while true; do
  read -p "Are these informations correct? [y/n]: " yn 
  case $yn in
    [Yy]* ) writeinterfacefile $file $interfacesnum;;
    [Nn]* ) getinfo;;
        * ) echo "Pleas enter y or n!";;
  esac
done
