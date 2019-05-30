var server = require('./server');
var ds = server.dataSources.tabel;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Worker', 'Subdivision'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
