import Route from "./Routes";
import styled from 'styled-components'


function App() {

  const MainWrapper = styled.div`
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
  `
  return (
    <MainWrapper>
      <Route></Route>
    </MainWrapper>
  );
}

export default App;
