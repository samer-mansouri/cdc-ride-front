import React from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import AdminService from "../../services/admin.service";
import UpdateUserModal from "./UpdateUserModal";
import Moment from 'react-moment';



function UsersTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Photo",
        accessor: "picture",
      },
      {
        Header: "Nom",
        accessor: "firstName",
      },
      {
        Header: "Prenom",
        accessor: "lastName",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "Date de naissance",
        accessor: "dateOfBirth",
      },
      {
        Header: "Numéro de téléphone",
        accessor: "phoneNumber",
      },
      {
        Header: "Genre",
        accessor: "gender",
      },
      {
        Header: "Adress",
        accessor: "address"
      },
      {
        Header: "Role",
        accessor: "role"
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
      }, 
      {
        Header: "Modifier",
        accessor: "update",
      },
   
    ],
    []
  );


  const [fetchedData, setFetchedData] = React.useState([]);

  const data = React.useMemo(() => fetchedData, []);
  const [refresh, setRefresh] = React.useState(false);


  const fetchData = () => {
    AdminService.getUsers().then((res) => {
      console.log(res.data.users);
      setFetchedData(res.data.users);
      
    }).catch((err) => {
      console.log(err);
    });
  }

  const DeleteComponent = ({ id }) => (
    <button
      onClick={() => {
        AdminService.deleteUser(id).then((res) => {
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

  const AprouveComponent = ({ id }) => (
    <button
      onClick={() => {
        AdminService.approveUser(id).then((res) => {
          fetchData();
          alert("Approuvé avec succès!");
        }).catch((err) => {
          console.log(err);
        });
      }}
      className="bg-green-600 text-white py-2 px-4 rounded"
    >
      APPROUVER
    </button>
  )

  const isApprouved = (aproved = false) => {
    if(aproved === true){
      return "Approuvé";
    } else {
      return "Non approuvé";
    }
  }

  const UserImage = ({ picture }) => (
    <img
      src={picture}
      alt="user"
      className="w-12 h-12 rounded-full mr-4"
    />

  )

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const tab = {
    columns: columns,

    rows: fetchedData.map((data) => {
      return {
        _id: data._id,
        picture: <UserImage picture={data.picture} />,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dateOfBirth: <Moment format="DD-MM-YYYY">{data.dateOfBirth}</Moment>,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        address: data.address,
        role: data.role == "Driver" ? "Conducteur" : "Passager",
        approved: data?.isVerified ? "Oui" : "Non",
        approve: data?.isVerified ? '' : <AprouveComponent id={data._id} />,
        delete: <DeleteComponent id={data._id} />,
        update: <UpdateUserModal user={data} toggleRefresh={() => setRefresh(!refresh)}/>,
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

export default UsersTable;