import { useCallback, useEffect, useMemo, useState } from 'react'
import useKeyPress from '../hooks/useKeyPress'

export type Line = {
  content: string
  showUser?: boolean
  error?: boolean
  triggerExit?: boolean
}

export type Command = {
  name: string
  description: string
  handler: (...args: string[]) => Line
}

export type TypeableStateOptions = {
  allowTyping?: boolean
  allowErasing?: boolean
  allowSubmission?: boolean
  onType?: (value: string, key: string) => void
  onDelete?: (value: string) => void
  onSubmit?: (value: string) => void
}

export const useTypeableState = (
  initialValue: string,
  options?: TypeableStateOptions
) => {
  const safeOptions = useMemo(
    () => ({
      allowTyping: true,
      allowErasing: true,
      allowSubmission: true,
      ...options,
    }),
    [options]
  )

  const [value, setValue] = useState(initialValue)
  const enter = useKeyPress('Enter')

  // Handle submission
  useEffect(() => {
    if (enter && safeOptions.allowSubmission && value.length > 0) {
      safeOptions.onSubmit?.(value)
      setValue('')
    }
  }, [enter, safeOptions, value])

  // Handle erasing
  useKeyPress('Backspace', {
    onKeyDown: useCallback(() => {
      if (safeOptions.allowErasing && value.length > 0) {
        setValue(value.slice(0, -1))
        safeOptions.onDelete?.(value)
      }
    }, [safeOptions, value]),
  })

  // Handle typing
  useKeyPress('.*', {
    onKeyDown: useCallback(
      (key: string) => {
        if (safeOptions.allowTyping && key.length === 1) {
          setValue(value + key)
          safeOptions.onType?.(value, key)
        }
      },
      [safeOptions, value]
    ),
  })

  return value
}

export const useCommandHandler =
  (commands: Command[], callback: (response: Line) => void) =>
  (input: string) => {
    const command = commands.find((c) => c.name === input.split(' ')[0])
    const args = input.split(' ').slice(1)

    if (command) {
      const result = command.handler(...args)

      if (!result.content) {
        result.triggerExit && callback(result)
        return
      }

      for (const content of result.content.split('\n')) {
        callback({ ...result, content })
      }
    } else {
      callback({
        content: `isosh: command not found: ${input}`,
        error: true,
      })
    }
  }

export const Commands: Command[] = [
  {
    name: 'help',
    description: 'Show this help message',
    handler: () => ({
      content: `Available commands:\n${Commands.map(
        (c) => `  ${c.name} - ${c.description}`
      ).join('\n')}`,
    }),
  },
  {
    name: 'echo',
    description: 'Echo the given input',
    handler: (...input: string[]) => ({
      content: input.join(' '),
    }),
  },
  {
    name: 'cd',
    description: 'Change directory',
    handler: (...input: string[]) => {
      const path = input.at(0) ?? ''
      const allowedPaths = ['~', '/home/isotach', '']

      if (allowedPaths.includes(path)) {
        return {
          content: '',
          showUser: false,
        }
      } else {
        return {
          content: `cd: no such file or directory: ${path}`,
          error: true,
        }
      }
    },
  },
  {
    name: 'ls',
    description: 'List directory contents',
    handler: () => ({
      content: 'ls: permission denied',
      error: true,
    }),
  },
  {
    name: 'cat',
    description: 'Concatenate files and print on the standard output',
    handler: () => ({
      content: 'cat: permission denied',
      error: true,
    }),
  },
  {
    name: 'pwd',
    description: 'Print working directory',
    handler: () => ({
      content: '/root',
    }),
  },
  {
    name: 'whoami',
    description: 'Print the current user',
    handler: () => ({
      content: 'root',
    }),
  },
  {
    name: 'exit',
    description: 'Exit the shell',
    handler: () => ({
      content: '',
      triggerExit: true,
    }),
  },
]
