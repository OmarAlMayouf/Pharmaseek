import { Stack } from 'expo-router'

const modalLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="sort" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </>
  )
}

export default modalLayout