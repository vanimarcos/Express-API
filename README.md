

### Connect with Mysql Database using SSL


1. create a self sign certificates using this code

```sh
rm -rf newcerts
mkdir newcerts && cd newcerts

# Create CA certificate
openssl genrsa 2048 > ca-key.pem
openssl req -new -x509 -nodes -days 3600 \
        -key ca-key.pem -out ca.pem

# Create server certificate, remove passphrase, and sign it
# server-cert.pem = public key, server-key.pem = private key
openssl req -newkey rsa:2048 -days 3600 \
        -nodes -keyout server-key.pem -out server-req.pem
openssl rsa -in server-key.pem -out server-key.pem
openssl x509 -req -in server-req.pem -days 3600 \
        -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem

# Create client certificate, remove passphrase, and sign it
# client-cert.pem = public key, client-key.pem = private key
openssl req -newkey rsa:2048 -days 3600 \
        -nodes -keyout client-key.pem -out client-req.pem
openssl rsa -in client-key.pem -out client-key.pem
openssl x509 -req -in client-req.pem -days 3600 \
        -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out client-cert.pem
```
2. Verify the certificates generated

```sh
openssl verify -CAfile ca.pem server-cert.pem client-cert.pem
```

The response should beÇ

```sh
server-cert.pem: OK
client-cert.pem: OK
```

To see more about the self signed certificates go to: https://dev.mysql.com/doc/refman/8.0/en/creating-ssl-files-using-openssl.html

3. Change the references of the certificates in the mysql config file my.cnf

```
ssl_ca=/etc/mysql/ssl/<ca>.pem
ssl_cert=/etc/mysql/ssl/<client-cert>.pem
ssl_key=/etc/mysql/ssl/<client-key>.pem

[mysqld]
ssl_ca=/etc/mysql/ssl/<ca>.pem
ssl_cert=/etc/mysql/ssl/<server-cert>.pem
ssl_key=/etc/mysql/ssl/<server-key>.pem
bind-address = *
require_secure_transport = ON
general_log_file=/var/log/mysql/mysql.log
general_log=1
log_error=/var/log/mysql/mysql_error.log

[mysqld_safe]
log_error=/var/log/mysql/mysql_error.log

```
