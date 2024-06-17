import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSchedule } from "../services/FirestoreService";

const SchedulePage = () => {
  const { documentId } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // fetch data from id
      try {
        const fetchedSchedule = await fetchSchedule(documentId);
        setSchedule(fetchedSchedule);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId, fetchSchedule]);

  return (
    <div className="ml-72 mr-10 mt-8">
      <div className="w-full">
        <div className="main flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
          <div className="p-3">schedulepage</div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
