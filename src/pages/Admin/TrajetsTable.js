import React from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import AdminService from "../../services/admin.service";

function TrajetsTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Lieu de départ",
        accessor: "placeOfDeparture",
      },
      {
        Header: "Lieu de destination",
        accessor: "placeOfDestination",
      },
      {
        Header: "Temps de départ",
        accessor: "departureTime",
      },
      {
        Header: "Trajectoire effectué",
        accessor: "pathTaken",
      },
      {
        Header: "Prix",
        accessor: "price",
      },
      {
        Header: "Num Tel",
        accessor: "phoneNumber",
      },
      {
        Header: "Approuvé",
        accessor: "approved"
      },
      {
        Header: "Approuver",
        accessor: "approve",
      },
      {
        Header: "Supprimer",
        accessor: "delete",
      }
    ],
    []
  );


  const [fetchedData, setFetchedData] = React.useState([]);

  const data = React.useMemo(() => fetchedData, []);


  const fetchData = () => {
    AdminService.getTrajets().then((res) => {
      console.log(res.data.trajets)
      setFetchedData(res.data.trajets);
    }).catch((err) => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    fetchData();
  }, []);


  const DeleteComponent = ({ id }) => (
    <button
      onClick={() => {
        AdminService.deleteTrajet(id).then((res) => {
          fetchData();
        }).catch((err) => {
          console.log(err);
        });
      }}

      className="bg-red-600 text-white py-2 px-4 rounded"
    >
      Supprimer
    </button>
  
  )

  const AprouveComponent = ({ id }) => (
    <button
      onClick={() => {
        AdminService.confirmTrajet(id).then((res) => {
          fetchData();
          alert("Trajet approuvé")
        }).catch((err) => {
          console.log(err);
        });
      }}
      className="bg-green-600 text-white py-2 px-4 rounded"
    >
      APPROUVER
    </button>
  )

  const tab = {
    columns: columns,
    rows: fetchedData.map((trajet) => {
      return {
        _id: trajet._id,
        placeOfDeparture: trajet.placeOfDeparture,
        placeOfDestination: trajet.placeOfDestination,
        departureTime: trajet.departureTime,
        pathTaken: trajet.pathTaken,
        price: trajet.price,
        phoneNumber: trajet.phoneNumber,
        approved: trajet?.isConfirmed ? "Oui" : "Non",
        approve: trajet?.isConfirmed ? '' : <AprouveComponent id={trajet._id} />,
        delete: <DeleteComponent id={trajet._id} />,
      }
    })
  }

  return (
    <>
        <Navbar />
        <div >
        <Table table={{ columns: tab.columns, rows:tab.rows}} />    
        </div>
    </>
  );
}

export default TrajetsTable;