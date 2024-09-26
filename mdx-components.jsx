import Image from 'next/image'
 
export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    p: ({ children }) => (
      // <p style={{ color: 'red' }}>{children}</p>
      <p className='bg-red-100'>{children}</p>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...props}
      />
    ),
    ...components,
  }
}