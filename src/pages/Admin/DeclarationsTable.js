import React from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import AdminService from "../../services/admin.service";
import Moment from 'react-moment';



function DeclarationsTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Titre",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Date de déclaration",
        accessor: "createdAt",
      },
      {
          Header: "Utilisateur",
            accessor: "user",
      },
      {
          Header: "Email de l'utilisateur",
            accessor: "userEmail",
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
  const [refresh, setRefresh] = React.useState(false);


  const fetchData = () => {
    AdminService.getDeclarations().then((res) => {
      console.log(res.data.declarations);
      setFetchedData(res.data.declarations);
      
    }).catch((err) => {
      console.log(err);
    });
  }

  const DeleteComponent = ({ id }) => (
    <button
      onClick={() => {
        AdminService.deleteDeclaration(id).then((res) => {
          fetchData();
          alert("Suppression effectuée avec succès!");
        }).catch((err) => {
          console.log(err);
        });
      }}

      className="bg-red-600 text-white py-2 px-4 rounded"
    >
      SUPPRIMER
    </button>
  
  )




  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const tab = {
    columns: columns,

    rows: fetchedData.map((data) => {
      return {
        _id: data._id,
        title: data.title,
        description: data.description,
        user: data.user[0].firstName + " " + data.user[0].lastName,
        userEmail: data.user[0].email,
        createdAt: <Moment format="DD/MM/YYYY">{data.createdAt}</Moment>,
        delete: <DeleteComponent id={data._id} />
      }
    })
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

export default DeclarationsTable;