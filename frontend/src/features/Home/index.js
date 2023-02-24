import React, { useCallback, useEffect, useState } from "react";
import Filters from "./components/Filters";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { getSettingsOptions } from "../../reducers/settingsSlice";
import { useSelector } from "react-redux";
import { selectOptions } from "../../reducers/settingsSlice";
import { getData, selectGet } from "../../reducers/dataSlice";
import Loader from "../../components/Loader";
import ContentCard from "./components/ContentCard";
import "./style.scss";
import BasicPagination from "../../components/BasicPagination";

function Home() {
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const {
    sources,
    categories,
    isLoading: optionsIsLoading,
  } = useSelector(selectOptions);
  const { data, isLoading, pages } = useSelector(selectGet);
  const fetchData = useCallback(
    (filters) => {
      dispatch(getData({ ...filters, page }));
    },
    [dispatch, page]
  );
  useEffect(() => {
    dispatch(getSettingsOptions()).then(() => {
      fetchData(user.setting);
    });
  }, [dispatch, fetchData, user.setting]);

  return (
    <section className="home-page-section">
      <Filters
        filters={user.setting}
        sources={sources}
        categories={categories}
        onSubmit={fetchData}
        isLoading={isLoading || optionsIsLoading}
      />
      {(isLoading || optionsIsLoading) && <Loader />}
      <article className="articles-container">
        {data.map((article, index) => (
          <ContentCard key={index} article={article} />
        ))}
      </article>
      <BasicPagination
        count={pages}
        onChange={(e, number) => setPage(number)}
        page={page}
      />
    </section>
  );
}

export default Home;
