import instructions from '@/assets/instructions.txt'

export default {
  auth: {
    welcome: `
please identify yourself before going any further.
your handle can be from 4 to 64 alpha-numerical characters.
`,
    prompt: `
login: `,
  
    undefined: `
there was an error during login phase. please try again.
`,

    minlength: `
this username is too short. a minimum of 4 characters is required.
`,
  
    maxlength: `
this username is too long. a maximum of 64 characters can be entered.
`,

    format: `
this username has invalid characters. make sure to use only alpha-numerical characters.
`,

    exists: `
this username is currently being used. please choose an other one.
`,

    success: `
welcome {0}!

`
  },

  main: {
      instructions,
      notfound: `
user {0} was not found
`
  }
}
