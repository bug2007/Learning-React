// import { useIsFetching } from "@tanstack/react-query"; // this header is always visible on every page in the app. we can use useIsFetching to find out whether tanstack query is currently fetching data anywhere in the app 

export default function Header({ children }) {
  // const fetching = useIsFetching();  // fetching = 0 means not fetching. a higher number means fetching
  return (
    <>
      <div id="main-header-loading">
        {/* {fetching > 0 && <progress />} */}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
