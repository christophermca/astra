import React from "react";
export default ({templateName, templateId, teamName, userId, submitSearch}) =>
  <form onSubmit={submitSearch}>
    <label>Template Name </label>
      <input type="text" id="template-name-search-bar" placeholder="Search"
        value={templateName} name="templateNameValue" />
    <label>Template ID </label>
    <input
      type="text" id="template-id-search-bar" placeholder="Search"
      value={templateId} name="templateIdValue" />
    <label>Team Name </label>
    <input
      type="text" id="team-search-bar" placeholder="Search"
      value={teamName} name="teamNameValue" />
    <label>User ID </label>
    <input
      type="text" id="user-id-search-bar" placeholder="Search"
      value={userId} name="userIdValue" />
    <button type="submit">APPLY</button>
  </form>

