import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../util/axios";
import ReactPaginate from "react-paginate";
import { saveAs } from "file-saver";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function PaymentHistory() {
  const currentUser = localStorage.getItem("idConnected");
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setcurrentPage(selectedPage);
    setoffset(offset);
    loadMoreData();
  };
  const loadMoreData = () => {
    const data = orgtableData;
    const slice = data.slice(offset, offset + perPage);
    setpageCount(Math.ceil(data.length / perPage));
    settableData(slice);
  };
  useEffect(() => {
    const evts = () => {
      axios.get(`/api/Event_user/${currentUser}`).then((res) => {
        var data = res.data.event;
        var slice = data.slice(offset, offset + perPage);
        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        settableData(slice);
      });
    };

    evts();
  }, []);

  const { Name, LastName } = useSelector((state) => state.auth);
  const tokenHandler = (
    Name,
    image,
    Title,
    StartTime,
    city,
    date,
    LastName,
    ClassName,
    Location
  ) => {
    axios
      .post("/api/create-pdf", {
        Name,
        image,
        Title,
        StartTime,
        city,
        LastName,
        date,
        ClassName,
        Location,
      })
      .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, `${Name}_Ticket.pdf`);
      });
  };
  return (
    <div class="main-container" id="container">
      {/*    <br /> <br /> <br /> <br /> <br /> <br /> <br />
      {tableData && tableData.length > 0
        ? tableData.map((org, index) => {
            return (
              <>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                  {org.images && org.images.length > 0 ? (
                    org.images.map((Ph) => {
                      return (
                        <>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`Events/${Ph.filename}`}
                            alt="green iguana"
                          />
                        </>
                      );
                    })
                  ) : (
                    <img
                      src={`uploads/noAvatar.png`}
                      style={{
                        height: "60px",
                        width: "60px",
                        textAlign: "center",
                        margin: "auto",
                        display: "flex",
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don’t open.)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>

                
              </>
            );
          })
        : null} */}
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
              <br />
              <br />
              <br />
              <br />
              <br />
              <div
                class="widget-content widget-content-area br-6"
                style={{ backgroundColor: "#081847" }}
              >
                <div class="table-responsive mb-4 mt-4">
                  <div class="col-lg-9 mb-50 mb-lg-0">
                    <div class="filter-tab" style={{ width: "1200px" }}>
                      <div class="filter-area">
                        <div class="filter-main">
                          <div class="left w-100 justify-content-between">
                            <div class="item">
                              <span class="show">
                                Affichage: {tableData.length}
                              </span>
                            </div>
                            <div class="item mr-0">
                              <input
                                type="text"
                                placeholder="Recherche:"
                                onChange={(evnt) => {
                                  /*    setSearchData(evnt.target.value); */
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <table
                    class="table table-striped table-bordered"
                    style={{
                      width: "1200px",
                      height: "120px",
                      marginLeft: "1em",
                      backgroundColor: "#081847",
                    }}
                  >
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Photo</th>
                        <th>Titre</th>
                        <th>Date</th>
                        <th>Lieu</th>
                        <th>Ville</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData && tableData.length > 0
                        ? tableData.map((org, index) => {
                            return (
                              <>
                                <tr>
                                  <td>{index}</td>
                                  <td>
                                    {org.images && org.images.length > 0 ? (
                                      org.images.map((Ph) => {
                                        return (
                                          <>
                                            <img
                                              src={
                                                Ph
                                                  ? `Events/${Ph.filename}`
                                                  : `uploads/noAvatar.png`
                                              }
                                              style={{
                                                height: "60px",
                                                width: "60px",
                                                textAlign: "center",
                                                margin: "auto",
                                                display: "flex",
                                              }}
                                            />
                                          </>
                                        );
                                      })
                                    ) : (
                                      <img
                                        src={`uploads/noAvatar.png`}
                                        style={{
                                          height: "60px",
                                          width: "60px",
                                          textAlign: "center",
                                          margin: "auto",
                                          display: "flex",
                                        }}
                                      />
                                    )}
                                  </td>
                                  <td>{org.Title}</td>
                                  <td>{org.StartDate}</td>
                                  <td>{org.Location}</td>
                                  <td>{org.city}</td>
                                  <td>
                                    <button
                                      style={{
                                        backgroundColor: "#009688",
                                        border: "none",
                                        color: "white",
                                        width: "50px",
                                        height: "35px",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        display: "inline-block",
                                      }}
                                      onClick={() =>
                                        tokenHandler(
                                          Name,
                                          org.images,
                                          org.Title,
                                          org.StartTime,
                                          org.city,
                                          org.StartDate,
                                          LastName,
                                          org.ClassName,
                                          org.Location
                                        )
                                      }
                                    >
                                      Ticket
                                    </button>
                                    &nbsp;&nbsp;
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>adresse</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                  <ReactPaginate
                    previousLabel={"Préc"}
                    nextLabel={"Suiv"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;
