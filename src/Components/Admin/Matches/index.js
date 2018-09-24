import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../HOC/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { dbMatches } from "../../../firebase";
import { dbLooper } from "../../UI/misc";
import { Tab } from "@material-ui/core";

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: []
  };

  componentDidMount() {
    dbMatches.once("value").then(snapshot => {
      const matches = dbLooper(snapshot);
      this.setState({
        isLoading: false,
        matches: matches.reverse()
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.matches
                  ? this.state.matches.map((match, index) => (
                      <TableRow key={index}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <Link to={`/admin_matches/edit_match/${match.id}`}>
                            <strong>
                              {match.away} - {match.local}
                            </strong>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <strong>
                            {match.resultAway} - {match.resultLocal}
                          </strong>
                        </TableCell>
                        <TableCell>
                          {match.final === "Yes" ? (
                            <span className="matches_tag_red">Final</span>
                          ) : (
                            <span className="matches_tag_green">
                              Match not played yet
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress thickness={3} style={{ color: "#98c5e9" }} />
            ) : null}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminMatches;
