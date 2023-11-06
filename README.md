# strapi-plugin-import-export-web

This plugin provides a web ui for the `strapi import` and `strapi export` commands, so that you can backup/restore your strapi easily.

<img width="1256" alt="Screenshot 2566-11-06 at 11 16 07" src="https://github.com/taskworld/strapi-plugin-import-export-web/assets/411625/ba671516-904e-41bf-a1fe-4a5d1bdc04af">

## Official documentation of the commands

- [strapi import](https://docs.strapi.io/dev-docs/data-management/import)
- [strapi export](https://docs.strapi.io/dev-docs/data-management/export)

## Installation

- Install the plugin with `yarn add strapi-plugin-import-export-web`

## Configuration

The plugin will run without options by default.

**When doing so, the generated tarball name will be your package.json name field, and encryption will be disabled.**

In your `config/plugins.js` you can add:

```js
{
  "strapi-plugin-import-export-web: {
    enabled: true,
    config: {
      archiveName: 'my-custom-prefix',
      encryptionKey: 'mySuperSecretKey'
    }
  }
}
```

## ACL

You can go an enable/disable import and export actions in the roles section of the admin panel. This should enable/disable endpoints and stop displaying the section according to the permissions you provided.

<img width="1222" alt="Screenshot 2566-11-06 at 11 17 00" src="https://github.com/taskworld/strapi-plugin-import-export-web/assets/411625/595d6a6a-7c49-4e89-bb51-a68971adaaef">

## Notes

The encryption key is NOT part of the forms because it's just too dangerous imho. You'll send a potential "secret" over the wire, which you'll have to store and remember by yourself. It's easy to leak but more importantly easy to forget.

Be careful that this suppress warnings so once you press the button, it'll be running no matter what.

There are no translations because we went for the shortest path to completion but PRs are welcomed.
