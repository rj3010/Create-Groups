/** @format */
import CreateGroupScreen from "./components/CreateGroupScreen"

const style = {
  backgroundColor: "black",
  color: "white",
  minHeight: "100vh",
  width: "100vw",
}
function App() {
  return (
    <div style={style}>
      <h1 className="text-center bg-primary">Create user groups</h1>
      <CreateGroupScreen />
    </div>
  )
}

export default App
