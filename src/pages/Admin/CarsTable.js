import React from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import AdminService from "../../services/admin.service";


function CarsTable() {
  const columns = React.useMemo(
    () => [
        {
            Header: "ID",
            accessor: "_id",
          },
      {
        Header: "Marque",
        accessor: "mark",
      },
      {
        Header: "Modèle",
        accessor: "model",
      },
      {
        Header: "Motorisation",
        accessor: "motorization",
      },
      {
        Header: "Puissance",
        accessor: "power",
      },
      {
        Header: "Année",
        accessor: "year",
      },
      {
        Header: "Couleur",
        accessor: "color",
      },
      {
        Header: "Catégorie",
        accessor: "category",
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
    AdminService.getVehicules().then((res) => {
      console.log(res.data.vehicules)
      setFetchedData(res.data.vehicules);
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
        AdminService.deleteVehicule(id).then((res) => {
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
        AdminService.confirmVehicule(id).then((res) => {
          fetchData();
          alert("Véhicule approuvé")
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

    rows: fetchedData.map((data) => {
      return {
        _id: data._id,
        mark: data.mark,
        model: data.model,
        motorization: data.motorization,
        power: data.power,
        year: data.year,
        color: data.color,
        category: data.category,
        approved: data?.isConfirmed ? "Oui" : "Non",
        approve: data?.isConfirmed ? '' : <AprouveComponent id={data._id} />,
        delete: <DeleteComponent id={data._id} />,
      }})

  }

  return (
    <>
        <Navbar />
        <div >
        <Table table={{columns: tab.columns, rows:tab.rows}} />    
        </div>
    </>
  );
}

export default CarsTable;