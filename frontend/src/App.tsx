import './App.css'

import { Button } from '@/components/ui/button'

function App() {

  const test = async () => {
    const result = await fetch("http://localhost:3000/user/test");
    console.log(result);
  }

  return (
  
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={test}>Click me</Button>
    </div>)
}

export default App
