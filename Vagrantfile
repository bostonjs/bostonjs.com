# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.forward_agent = true
  config.vm.box = 'ubuntu/trusty64'
  config.vm.synced_folder '.', '/mnt/site'
  config.vm.network "private_network", ip: "192.168.33.50"
  config.hostsupdater.aliases = ['bostonjs.loc']
  config.vm.define 'vagrant'
  config.vm.provision "ansible" do |ansible|
    ansible.verbose = 'vv'
    ansible.groups = {'localdev' => ['vagrant']}
    ansible.playbook = 'deploy/ansible/provision.yml'
  end

end
