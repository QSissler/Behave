import React, { useEffect, useState } from "react";


const CohortContext = React.createContext();


function CohortProvider({ children }) {
  const [cohorts, setCohorts] = useState([]);


  useEffect(() => {
    fetch("/cohorts")
    .then(res => res.json())
    .then(data => setCohorts(data))
  }, [])


  return (
    <CohortContext.Provider value={[cohorts, setCohorts]}>
      {children}
    </CohortContext.Provider>
  );
}

export { CohortContext, CohortProvider };