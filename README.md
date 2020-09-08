[![Develop branch Build Status](https://travis-ci.com/UN-OCHA/whd-site.svg?branch=develop)](https://travis-ci.com/UN-OCHA/whd-site)
[![Main branch Build Status](https://travis-ci.com/UN-OCHA/whd-site.svg?branch=main)](https://travis-ci.com/UN-OCHA/whd-site)
![Develop docker image](https://github.com/UN-OCHA/whd-site/workflows/Build%20docker%20image/badge.svg?branch=develop)
![Main docker image](https://github.com/UN-OCHA/whd-site/workflows/Build%20docker%20image/badge.svg?branch=main)

# World Humanitarian Day

This is the World Humanitarian Day Drupal 8 site. The code for this project is managed with composer.

To install security updates for Drupal, run `composer update drupal/core webflo/drupal-core-require-dev --with-dependencies`.

## Installation

The html directory is the document root. The vendor directories contains libraries that are required for the site to function. These libraries

- Checkout the repository.
- Run `composer install`. This will download Drupal core, contributed modules, contributed themes and libraries.
- Deploy the html and vendor directories to the web server(s).

### Initialisation

Use drush to bootstrap your site and import the initial configuration from the config subdirectory.

```bash
drush -y si --admin-password="your admin password" --db-url=mysql://drupal:drupal@127.0.0.1/drupal minimal
drush -y cset system.site uuid $(grep uuid config/system.site.yml | awk '{print $2}')
drush -y cim --source=config
drush php-eval 'node_access_rebuild();'
drush cr
```

## Testing

### Remote

Automatic testing is run via Travis CI. Code syntax, style and quality are inspected and finally behat installs an instance of the site and tests that logins work.

With a small alteration, these tests could run via GitHub Actions.

### Locally

`fin exec "vendor/bin/phpunit --debug --colors --printer '\\Drupal\\Tests\\Listeners\\HtmlOutputPrinter'"`

## Config

```php
// Docksal DB connection settings.
$databases['default']['default'] = array (
  'database' => 'whd',
  'username' => 'whd',
  'password' => 'whd',
  'host' => 'mysql',
  'driver' => 'mysql',
);
```

## Migrate

### Install from config

`fin drush --verbose -y si --existing-config --account-pass="admin"`

### Update core

```bash
fin composer outdated drupal/core
```

```bash
fin composer update drupal/core --with-dependencies
fin drush updb -y && fin drush cr
```

### Update contrib

```bash
fin composer outdated drupal/*
```

```bash
fin composer update drupal/* --with-dependencies
fin drush updb -y && fin drush cr
```

### HID

Create and add keys.

```
mkdir -p keys
cd keys
openssl genpkey -algorithm RSA -out hid.rsa -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in hid.rsa -out hid.rsa.pub
cd ..
docker cp keys/hid.rsa f574cbb816a7:srv/www/keys/
docker cp keys/hid.rsa.pub f574cbb816a7:srv/www/keys/
```

Create test site and test user

```
docker-compose exec dev node ./commands/createDummyClient.js --url=https://iasc8.local.docksal/ --redirectUrl=https://iasc8.local.docksal/user/login/hid/callback
docker-compose exec dev node ./commands/createDummyUser.js --email=test@example.com --password=pwd
```

Update Drupal config

```
fin drush config-set -y social_auth_hid.settings base_url http://hid.iasc8.local.docksal
fin drush config-set -y social_auth_hid.settings client_id client
fin drush config-set -y social_auth_hid.settings client_secret clientsecret
```

## Static version

Add `$settings['tome_static_directory'] = '../docs';` to `settings.php`.

```bash
fin composer require drupal/tome --dev
fin drush en stage_file_proxy
fin drush en tome_static -y
fin drush pm-uninstall google-tag -y
```

```bash
mkdir -p docs
rm -rf docs/*
fin drush tome:static -l https://un-ocha.github.io/whd-site-2020/
```

```bash
git clone git@github.com:UN-OCHA/whd-site-2020.git
rm -rf whd-site-2020/*
cp -r docs/whd-site-2020/* whd-site-2020/
```

```bash
mkdir -p assets
wget2 --mirror --page-requisites --directory-prefix=assets --adjust-extension --convert-links --output-file=assets.log --no-host-directories --no-parent https://www.worldhumanitarianday.org/
cp -r assets/sites/* whd-site-2020/sites/
cp -r assets/themes/* whd-site-2020/themes/
```

```bash
find . -type f -name 'index.html' | xargs sed -i -e 's/src="\/sites/src="\/whd-site-2020\/sites/'
find . -type f -name 'index.html' | xargs sed -i -e 's/, \/sites/, \/whd-site-2020\/sites/'
find . -type f -name 'index.html' | xargs sed -i -e 's/srcset="\/sites/srcset="\/whd-site-2020\/sites/'
find . -type f -name 'index.html' | xargs sed -i -e 's/src="\/themes/src="\/whd-site-2020\/themes/'
find . -type f -name 'index.html' | xargs sed -i -e 's/href="\/story/href="\/whd-site-2020\/story/'
```
