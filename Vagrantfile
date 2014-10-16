# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.forward_agent = true
  config.vm.box = "hashicorp/precise64"
  config.vm.network "private_network", ip: "192.168.33.50"
  config.vm.provision "ansible" do |ansible|
    ansible.verbose = 'vv'
    ansible.limit = "vagrant"
    ansible.inventory_path = "deploy/ansible/hosts"
    ansible.playbook = "deploy/ansible/vagrant.yml"
  end

end
