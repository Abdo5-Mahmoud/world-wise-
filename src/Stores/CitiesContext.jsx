import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";

const FakeCities = [
  {
    id: "f190",
    cityName: "Cairo",
    country: "Egypt",
    emoji: "🇪🇬",
    date: "2024-08-17T11:09:04.620Z",
    notes: "my home\n",
    position: {
      lat: 29.91464004056296,
      lng: 31.284148633767728,
    },
  },
  {
    id: "a47e",
    cityName: "Dima",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2024-08-17T11:13:58.731Z",
    notes: "d",
    position: {
      lat: 43.09980359913638,
      lng: -2.6823819181746904,
    },
  },
  {
    id: "6028",
    cityName: "El Castellar",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2024-09-21T06:38:29.249Z",
    notes: "",
    position: {
      lat: 40.362448671445875,
      lng: -0.8383167485854549,
    },
  },
  {
    id: "a593",
    cityName: "Lathus-Saint-Remy",
    country: "France",
    emoji: "🇫🇷",
    date: "2024-09-28T11:56:22.586Z",
    notes: "",
    position: {
      lat: 46.31599517575644,
      lng: 0.9262251879809337,
    },
  },
];

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      // console.log(action.payload);

      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      // console.log(action.payload);

      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id != action.payload),
        currentCity: null,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unkown action type");
  }
}

export function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const cities = FakeCities;
        dispatch({ type: "cities/loaded", payload: cities });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was error loading cities",
        });
      }
    }
    fetchCities();
  }, []);

  function createCity(city) {
    dispatch({ type: "loading" });
    // console.log(city);

    dispatch({ type: "city/created", payload: city });
  }
  function deleteCity(id) {
    dispatch({ type: "loading" });
    dispatch({ type: "city/deleted", payload: id });
  }

  const getCity = useCallback(
    async function getCity(id) {
      // console.log(cities);
      if (!id) return;
      dispatch({ type: "loading" });
      const city = cities.find((city) => city.id == id) || null;
      // console.log(city);
      // console.log(cities);
      dispatch({ type: "city/loaded", payload: city });
      // console.log("city loaded done");
    },
    [cities]
  );
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        createCity,
        deleteCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
export function useCitiesContext() {
  const context = useContext(CitiesContext);

  if (context == undefined)
    throw new Error("You used the Context outside the citiesProvider");
  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
