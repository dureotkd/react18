import axios from "axios";
import React, { Suspense } from "react";
import "./assets/css/global.css";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";

import ErrorBoundary from "./ErrorBoundary";

import { Routes, Route, Link } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const wait = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, sec);
  });
};

const YegaAnalContent = () => {
  const { data: yegasApi } = useQuery(["yegas"], async () => {
    const apiData = await axios({
      url: "https://jsonplaceholder.typicode.com/photos",
    });
    return apiData.data;
  });

  const [yegas, setYegas] = React.useState(yegasApi);

  const handlePhotos = React.useCallback((photoId) => {
    // remove api 호출

    setYegas((prevItem) => {
      return prevItem.filter((item) => item.id !== photoId);
    });
  }, []);

  return (
    <div>
      {yegas &&
        yegas.map((item) => {
          return (
            <div style={{ marginTop: 10 }} key={item.id}>
              {item.title}
              <button
                style={{ marginLeft: 10 }}
                onClick={handlePhotos.bind(this, item.id)}
              >
                삭제
              </button>
            </div>
          );
        })}
    </div>
  );
};

const Main = () => {
  return <div>Main</div>;
};

const Header = () => {
  return (
    <div>
      <ul
        style={{
          display: "flex",
          backgroundColor: "orange",
          justifyContent: "space-around",
        }}
      >
        <li>
          <Link to={{ pathname: "/" }}>메인</Link>
        </li>
        <li>
          <Link to={{ pathname: "/YegaAnalContent" }}>예가컨텐츠</Link>
        </li>
      </ul>
    </div>
  );
};

const AppIndex = () => {
  return (
    <React.Fragment>
      <Header />
      <Suspense fallback={<div>Page Loading...!@</div>}>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/YegaAnalContent" element={<YegaAnalContent />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppIndex />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
