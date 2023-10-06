import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/UserServices";
import ImagesCard from "../ImagesCard/ImagesCard";

const UserProfilePage = ({ user }) => {
  const { username, name, surname, avatar, images } = user;
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            setCurrentUser(res);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    }, []);

  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
        <div className="col col-lg-9 col-xl-7">
          <div>
            <div
              className="rounded-top text-white d-flex flex-row"
              style={{ backgroundColor: "#000", height: "200px" }}
            >
              <div
                className="ms-4 mt-5 d-flex flex-column align-items-center"
                style={{ width: "300px" }}
              >
                <img
                  src={avatar}
                  alt={username}
                  className="img-thumbnail mt-5 mb-2"
                  style={{ width: "200px", height:"200px", zIndex: 1, objectFit: "cover" }}
                />
                {currentUser && currentUser._id === user._id && (
                  <button
                    type="button"
                    className="btn btn-outline-dark mb-3"
                    data-mdb-ripple-color="dark"
                    style={{ width: "150px", zIndex: 1 }}
                  >
                    Edit profile
                  </button>
                )}
              </div>
              <div className="ms-1" style={{ marginTop: "120px" }}>
                <h5>@{username}</h5>
                <p>
                  {name} {surname}
                </p>
              </div>
            </div>
            <div
              className="px-4 py-5 text-black"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <p className="mb-1 h5">{images.length}</p>
                  <p className="small text-muted mb-0">Photos</p>
                </div>
              </div>
            </div>
            <div className="card-body p-4 text-black">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0">Recent photos</p>
                <p className="mb-0">
                  <a href="#!" className="text-muted">
                    Show all
                  </a>
                </p>
              </div>
              <div className="row g-2">
                {images && images.length > 0 ? (
                  images.map((image) => (
                    <div key={image._id} className="col">
                      <ImagesCard image={image} currentUser={currentUser}/>
                    </div>
                  ))
                ) : (
                  <p>No images found for this user.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;