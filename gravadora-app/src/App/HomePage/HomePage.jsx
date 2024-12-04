import React from "react";
import "./HomePage.css";

const HomePage = () => {
  const artists = [
    { name: "Elis Regina", image: "https://imgs.search.brave.com/vhC886w67FuNnFv08SzPr8sceTRZjj5JKBJR8qSCvwk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1HVTFNbUZp/T0RndFpEZGlZeTAw/TkdJeExXRTJaR1l0/T1RKbFpERXdaakE1/TmpBelhrRXlYa0Zx/Y0djQC5qcGc" },
    { name: "Caetano Veloso", image: "https://cdn-images.dzcdn.net/images/artist/451acaa56a5718d9d0accfe3237055ed/1900x1900-000000-80-0-0.jpg" },
    { name: "Tropicália", image: "https://s2-g1.glbimg.com/EvCu__DLE5OzdiOV1hBLfkWer2I=/0x0:1498x1500/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/N/5/vtbwGaT4S2GrGmRqSYEw/tropicalialp.jpg" },
    { name: "Chico Buarque", image: "https://cdn.brasildefato.com.br/media/a950ca24129dea4c4f080baa789c655f.jpg" },
    { name: "Construção", image: "https://s2-g1.glbimg.com/W6bN0XGqdNN54KNlaROvb3ZDaFs=/0x0:1600x1600/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/Q/Q/BwKPFHQda860UKzrVEbg/chicobuarqueconstrucaolpcapa.jpg" },
    { name: "Carly Rae Jepsen", image: "https://tecoapple.com/wp-content/uploads/2022/09/carlyraejepsentalkingtoyourselfa022.jpg" },
    { name: "Folklore", image: "https://imgs.search.brave.com/5nUHopt0TsmWrxKimyBRt6kNbUcIsy0yz3Clo1oNLZ4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS81MDB4NTAwL2I4/ZGE5M2FiNmQ4YWEw/MDM4NDk5OGZkYWU3/NDUxZDkyLmpwZw" },
    { name: "Charlie xcx", image: "https://i.scdn.co/image/ab6761610000e5eb936885667ef44c306483c838" }
  ];

  return (
    <div className="homepage">
      <header>
        <h1>Bem-vindo à NossaBossa</h1>
        <p>Estamos felizes por ter você aqui!</p>
      </header>
      <div className="artist-gallery">
        {artists.map((artist, index) => (
          <div key={index} className="artist-card">
            <img src={artist.image} alt={artist.name} className="artist-image" />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
