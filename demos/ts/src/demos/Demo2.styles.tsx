import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  color: #777;
`;

export const InnerPanel = styled.div`
  width: 30vw;
  margin-top: 20px;
  border-radius: 30px;
  padding: 40px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
  color: #555;
  border-spacing: 0;
  td {
    border: 0;
  }

  thead {
    th {
      padding-bottom: 10px;
    }
  }

  tbody {
    td {
      padding: 10px;
    }

    tr:nth-child(even) {
      background-color: #fff;
    }
  }
`;
