/* =====================================================================
   DỮ LIỆU NỘI DUNG SONG NGỮ  ·  BILINGUAL CONTENT
   ---------------------------------------------------------------------
   - Mỗi đoạn chữ có 2 phiên bản: vi (tiếng Việt) và en (tiếng Anh).
   - Muốn sửa nội dung: chỉ cần sửa chữ trong dấu ngoặc kép.
   - Muốn thêm địa danh / món ăn: sao chép một khối { ... } và sửa lại.
   ===================================================================== */

window.VN_DATA = {
  /* ------------------------------------------------------------------
     BA MIỀN  ·  THREE REGIONS
     ------------------------------------------------------------------ */
  regions: {
    north: {
      id: "north",
      icon: "fa-landmark",
      name: { vi: "Miền Bắc", en: "Northern Vietnam" },
      short: { vi: "Bắc", en: "North" },
      city: { vi: "Hà Nội", en: "Hanoi" },
      title: { vi: "Hà Nội – Nghìn năm Thăng Long", en: "Hanoi – A Thousand Years of Thăng Long" },
      tagline: {
        vi: "Thủ đô ngàn năm văn hiến, nơi những mái ngói rêu phong, hồ nước tĩnh lặng và nghệ thuật dân gian vẫn vẹn nguyên hồn cốt.",
        en: "A thousand-year-old capital of mossy rooftops, tranquil lakes and folk arts that still keep their soul."
      },
      hero: "img/ho-hoan-kiem.jpg",
      cover: "Temple of Literature.webp",
      pin: { x: 34.8, y: 14.7, left: true },
      facts: [
        { icon: "fa-calendar-check", label: { vi: "Thời điểm đẹp", en: "Best time" }, value: { vi: "Tháng 9 – 11 (mùa thu)", en: "Sep – Nov (autumn)" } },
        { icon: "fa-cloud-sun", label: { vi: "Khí hậu", en: "Climate" }, value: { vi: "Bốn mùa rõ rệt", en: "Four distinct seasons" } },
        { icon: "fa-bowl-food", label: { vi: "Nhất định phải thử", en: "Must eat" }, value: { vi: "Phở, bún chả", en: "Phở, bún chả" } },
        { icon: "fa-masks-theater", label: { vi: "Nghệ thuật", en: "Heritage art" }, value: { vi: "Múa rối nước", en: "Water puppetry" } }
      ],
      landmarks: [
        {
          img: "img/ho-hoan-kiem.jpg",
          name: { vi: "Hồ Hoàn Kiếm & Tháp Rùa", en: "Hoan Kiem Lake & Turtle Tower" },
          desc: {
            vi: "Trái tim của Hà Nội, gắn với truyền thuyết vua Lê Lợi trả gươm báu cho Rùa Vàng. Tháp Rùa giữa hồ được xây năm 1886.",
            en: "The heart of Hanoi, tied to the legend of King Lê Lợi returning his magic sword to the Golden Turtle. The Turtle Tower in the lake dates from 1886."
          }
        },
        {
          img: "Temple of Literature.webp",
          name: { vi: "Văn Miếu – Quốc Tử Giám", en: "Temple of Literature" },
          desc: {
            vi: "Xây năm 1070 thờ Khổng Tử; năm 1076 trở thành Quốc Tử Giám – trường đại học đầu tiên của Việt Nam. 82 bia tiến sĩ là Di sản tư liệu thế giới.",
            en: "Built in 1070 to honour Confucius, it became Vietnam's first national university in 1076. Its 82 doctors' stelae are on UNESCO's Memory of the World register."
          }
        },
        {
          img: "img/old-quarter.jpg",
          name: { vi: "Phố cổ Hà Nội", en: "Hanoi Old Quarter" },
          desc: {
            vi: "“Hà Nội 36 phố phường” – mỗi con phố từng gắn với một nghề: Hàng Bạc, Hàng Mã, Hàng Đào… Hãy dạo bộ, ngồi ghế nhựa vỉa hè và nhâm nhi trà đá.",
            en: "The famous “36 streets”, each once named after its trade – Silver Street, Votive Paper Street, Silk Street… Wander on foot, perch on a tiny plastic stool and sip iced tea."
          }
        },
        {
          img: "img/one-pillar.jpg",
          name: { vi: "Chùa Một Cột", en: "One Pillar Pagoda" },
          desc: {
            vi: "Dựng năm 1049 thời vua Lý Thái Tông, ngôi chùa nhỏ đặt trên một cột đá giữa hồ, mô phỏng đóa sen vươn lên từ mặt nước.",
            en: "Built in 1049 under Emperor Lý Thái Tông, this tiny pagoda rests on a single pillar in a pond, shaped like a lotus rising from the water."
          }
        }
      ],
      art: {
        video: "media/water-puppet.mp4",
        badge: { vi: "Từ thế kỷ XI", en: "Since the 11th century" },
        title: { vi: "Múa rối nước", en: "Water Puppetry" },
        desc: {
          vi: "Loại hình nghệ thuật độc nhất vô nhị ra đời ở đồng bằng sông Hồng. Nghệ nhân đứng ngâm mình trong nước sau tấm mành tre để điều khiển con rối, kể chuyện làng quê, cày cấy và truyền thuyết.",
          en: "A one-of-a-kind art born in the Red River Delta. Puppeteers stand waist-deep in water behind a bamboo screen, bringing village life, rice farming and ancient legends to life."
        }
      },
      dishes: [
        {
          img: "BeefNoodleSoup.webp",
          name: { vi: "Phở Hà Nội", en: "Hanoi beef noodle soup" },
          taste: { vi: "Thanh, thơm", en: "Clear & aromatic" },
          desc: {
            vi: "Bánh phở mềm, nước dùng xương bò ninh nhiều giờ với hồi, quế, gừng nướng; ăn kèm hành lá, chanh và ớt.",
            en: "Silky rice noodles in a clear beef broth simmered for hours with star anise, cinnamon and charred ginger, finished with spring onion, lime and chilli."
          }
        },
        {
          img: "img/bun-cha.jpg",
          name: { vi: "Bún chả", en: "Grilled pork with noodles" },
          taste: { vi: "Đậm đà, thơm khói", en: "Smoky & savoury" },
          desc: {
            vi: "Chả viên và thịt ba chỉ nướng than hoa, thả vào bát nước mắm chua ngọt, ăn cùng bún và rau thơm.",
            en: "Charcoal-grilled pork patties and pork belly in a sweet-and-sour fish-sauce dip, eaten with rice vermicelli and fresh herbs."
          }
        },
        {
          img: "cafe egg.jpg",
          name: { vi: "Cà phê trứng", en: "Egg coffee" },
          taste: { vi: "Béo, ngọt", en: "Rich & creamy" },
          desc: {
            vi: "Lòng đỏ trứng đánh bông với sữa đặc, phủ lên cà phê phin đậm – béo ngậy như món tráng miệng. Ra đời ở Hà Nội năm 1946.",
            en: "Egg yolk whipped with condensed milk into a velvety foam over strong drip coffee – dessert in a cup. Invented in Hanoi in 1946."
          }
        }
      ],
      funfact: {
        vi: "Năm 1010, vua Lý Thái Tổ dời đô về đây và đặt tên Thăng Long – “rồng bay lên”. Hà Nội kỷ niệm 1.000 năm tuổi vào năm 2010.",
        en: "In 1010, Emperor Lý Thái Tổ moved the capital here and named it Thăng Long – “Ascending Dragon”. Hanoi celebrated its 1,000th birthday in 2010."
      },
      music: {
        title: { vi: "Dân ca Bắc Bộ", en: "Northern Folk Melodies" },
        subtitle: { vi: "Âm hưởng Hà Nội", en: "Sounds of Hanoi" }
      }
    },

    central: {
      id: "central",
      icon: "fa-crown",
      name: { vi: "Miền Trung", en: "Central Vietnam" },
      short: { vi: "Trung", en: "Central" },
      city: { vi: "Huế", en: "Hue" },
      title: { vi: "Huế – Cố đô trầm mặc", en: "Hue – The Serene Imperial Capital" },
      tagline: {
        vi: "Kinh đô của 13 vị vua triều Nguyễn bên dòng sông Hương thơ mộng – nơi lưu giữ lăng tẩm, đền đài và nhã nhạc cung đình.",
        en: "Capital of 13 Nguyễn emperors on the poetic Perfume River – home to royal tombs, palaces and court music."
      },
      hero: "hue-imperial-city.webp",
      pin: { x: 51.3, y: 43.2, left: true },
      facts: [
        { icon: "fa-calendar-check", label: { vi: "Thời điểm đẹp", en: "Best time" }, value: { vi: "Tháng 2 – 8", en: "Feb – Aug" } },
        { icon: "fa-cloud-rain", label: { vi: "Khí hậu", en: "Climate" }, value: { vi: "Mùa mưa tháng 9 – 12", en: "Rainy season Sep – Dec" } },
        { icon: "fa-bowl-food", label: { vi: "Nhất định phải thử", en: "Must eat" }, value: { vi: "Bún bò Huế", en: "Bún bò Huế" } },
        { icon: "fa-music", label: { vi: "Nghệ thuật", en: "Heritage art" }, value: { vi: "Nhã nhạc cung đình", en: "Royal court music" } }
      ],
      landmarks: [
        {
          img: "hue-imperial-city.webp",
          name: { vi: "Đại Nội Huế", en: "Imperial Citadel of Hue" },
          desc: {
            vi: "Kinh thành của triều Nguyễn (1802–1945) với Ngọ Môn, điện Thái Hòa và Tử Cấm Thành. Di sản thế giới UNESCO từ năm 1993.",
            en: "The walled citadel of the Nguyễn dynasty (1802–1945) with the Noon Gate, Thái Hòa Palace and the Forbidden Purple City. A UNESCO World Heritage Site since 1993."
          }
        },
        {
          img: "thien-mu-pagoda.jpg",
          name: { vi: "Chùa Thiên Mụ", en: "Thien Mu Pagoda" },
          desc: {
            vi: "Ngôi chùa cổ dựng năm 1601 bên bờ sông Hương; tháp Phước Duyên 7 tầng (1844) đã trở thành biểu tượng của xứ Huế.",
            en: "An ancient pagoda founded in 1601 on the Perfume River; its seven-storey Phước Duyên tower (1844) has become the symbol of Hue."
          }
        },
        {
          img: "Khaidinh Tomb.jpg",
          name: { vi: "Lăng Khải Định", en: "Tomb of Emperor Khai Dinh" },
          desc: {
            vi: "Xây từ 1920 đến 1931, lăng kết hợp kiến trúc Á – Âu độc đáo; điện Khải Thành được khảm sành sứ và thủy tinh vô cùng tinh xảo.",
            en: "Built from 1920 to 1931, it blends Eastern and Western architecture; the Khải Thành hall is covered in exquisite ceramic and glass mosaics."
          }
        }
      ],
      art: {
        video: "media/nha-nhac.mp4",
        badge: { vi: "UNESCO 2003", en: "UNESCO 2003" },
        title: { vi: "Nhã nhạc cung đình Huế", en: "Hue Royal Court Music" },
        desc: {
          vi: "Âm nhạc chính thống của triều đình, vang lên trong các đại lễ. Năm 2003, Nhã nhạc trở thành di sản phi vật thể đầu tiên của Việt Nam được UNESCO vinh danh.",
          en: "The official music of the royal court, performed at grand ceremonies. In 2003 it became Vietnam's first intangible heritage honoured by UNESCO."
        }
      },
      dishes: [
        {
          img: "Bunbohue.webp",
          name: { vi: "Bún bò Huế", en: "Hue spicy beef noodle soup" },
          taste: { vi: "Cay, thơm sả", en: "Spicy & lemongrassy" },
          desc: {
            vi: "Sợi bún to, nước dùng thơm sả và mắm ruốc, có bắp bò, giò heo, chả cua và sa tế cay nồng.",
            en: "Thick round noodles in a lemongrass and shrimp-paste broth with beef shank, pork knuckle, crab cake and fiery chilli oil."
          }
        },
        {
          img: "img/banh-beo.jpg",
          name: { vi: "Bánh bèo", en: "Steamed rice cakes" },
          taste: { vi: "Mềm, mặn ngọt", en: "Soft & savoury" },
          desc: {
            vi: "Những chén bánh bột gạo nhỏ xinh, rắc tôm chấy, tóp mỡ, hành phi, chan nước mắm ngọt – món ăn chơi nổi tiếng của Huế.",
            en: "Dainty saucer-sized rice cakes topped with shrimp floss, crispy pork crackling and fried shallots, drizzled with sweet fish sauce."
          }
        },
        {
          img: "Cơm hến.webp",
          name: { vi: "Cơm hến", en: "Baby clam rice" },
          taste: { vi: "Cay, đậm vị", en: "Spicy & bold" },
          desc: {
            vi: "Món dân dã từ hến sông Hương trộn cơm nguội, tóp mỡ, đậu phộng, rau sống và ớt – đủ vị chua, cay, mặn, ngọt.",
            en: "A humble dish of tiny Perfume River clams tossed with cold rice, pork crackling, peanuts, herbs and chilli – sour, spicy, salty and sweet in one bowl."
          }
        }
      ],
      funfact: {
        vi: "Huế là kinh đô của Việt Nam suốt 143 năm (1802–1945). Sắc “tím Huế” gắn liền với tà áo dài của nữ sinh xứ Huế.",
        en: "Hue was Vietnam's capital for 143 years (1802–1945). Its signature “Hue purple” colours the áo dài of local schoolgirls."
      },
      music: {
        title: { vi: "Nhã nhạc cung đình", en: "Royal Court Music" },
        subtitle: { vi: "Cố đô Huế", en: "Imperial Hue" }
      }
    },

    south: {
      id: "south",
      icon: "fa-city",
      name: { vi: "Miền Nam", en: "Southern Vietnam" },
      short: { vi: "Nam", en: "South" },
      city: { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" },
      title: { vi: "Sài Gòn – Năng động & hiếu khách", en: "Saigon – Vibrant & Warm-hearted" },
      tagline: {
        vi: "Thành phố không ngủ, nơi kiến trúc Pháp cổ, chợ truyền thống và ẩm thực đường phố hòa quyện cùng sự hào sảng của người phương Nam.",
        en: "The city that never sleeps, where French colonial landmarks, bustling markets and street food meet the generous spirit of the South."
      },
      hero: "img/duc-ba.jpg",
      cover: "cho_ben_thanh.jpg",
      pin: { x: 42.8, y: 78.6 },
      facts: [
        { icon: "fa-calendar-check", label: { vi: "Thời điểm đẹp", en: "Best time" }, value: { vi: "Tháng 12 – 4 (mùa khô)", en: "Dec – Apr (dry season)" } },
        { icon: "fa-sun", label: { vi: "Khí hậu", en: "Climate" }, value: { vi: "Nhiệt đới, hai mùa", en: "Tropical, two seasons" } },
        { icon: "fa-bowl-food", label: { vi: "Nhất định phải thử", en: "Must eat" }, value: { vi: "Bánh mì, cơm tấm", en: "Bánh mì, cơm tấm" } },
        { icon: "fa-guitar", label: { vi: "Nghệ thuật", en: "Heritage art" }, value: { vi: "Đờn ca tài tử", en: "Đờn ca tài tử music" } }
      ],
      landmarks: [
        {
          img: "img/duc-ba.jpg",
          name: { vi: "Nhà thờ Đức Bà", en: "Saigon Notre-Dame Cathedral" },
          desc: {
            vi: "Hoàn thành năm 1880 với gạch đỏ mang từ Marseille (Pháp) – đến nay vẫn giữ màu tươi. Hai tháp chuông cao gần 58 m.",
            en: "Completed in 1880 with red bricks shipped from Marseille that still keep their colour today. Its twin bell towers rise nearly 58 m."
          }
        },
        {
          img: "cho_ben_thanh.jpg",
          name: { vi: "Chợ Bến Thành", en: "Ben Thanh Market" },
          desc: {
            vi: "Biểu tượng hơn trăm năm của Sài Gòn (khánh thành 1914) với tháp đồng hồ ở cửa nam – nơi lý tưởng để mua đặc sản, vải vóc, đồ thủ công và ăn quà vặt.",
            en: "A century-old Saigon icon (opened 1914) with its famous clock tower – perfect for local specialties, fabrics, handicrafts and street snacks."
          }
        },
        {
          img: "toan-canh-dinh-doc-lap.webp",
          name: { vi: "Dinh Độc Lập", en: "Independence Palace" },
          desc: {
            vi: "Công trình do kiến trúc sư Ngô Viết Thụ thiết kế (hoàn thành 1966), chứng nhân lịch sử của ngày thống nhất đất nước 30/4/1975.",
            en: "Designed by architect Ngô Viết Thụ and completed in 1966, the palace witnessed the reunification of Vietnam on 30 April 1975."
          }
        }
      ],
      art: {
        video: "media/don-ca-tai-tu.mp4",
        badge: { vi: "UNESCO 2013", en: "UNESCO 2013" },
        title: { vi: "Đờn ca tài tử Nam Bộ", en: "Đờn ca tài tử – Southern Folk Music" },
        desc: {
          vi: "Âm nhạc dân gian của người Nam Bộ với đàn kìm, đàn tranh, đàn cò, ghi-ta phím lõm… thường hòa tấu trong những buổi họp mặt, đám tiệc. UNESCO ghi danh năm 2013.",
          en: "Folk chamber music of the South played on the moon lute, zither, two-string fiddle and scalloped-fret guitar at family gatherings. Inscribed by UNESCO in 2013."
        }
      },
      dishes: [
        {
          img: "banh-mi-sai-gon.jpg",
          name: { vi: "Bánh mì Sài Gòn", en: "Saigon baguette sandwich" },
          taste: { vi: "Giòn, đậm đà", en: "Crunchy & savoury" },
          desc: {
            vi: "Ổ bánh mì giòn rụm kẹp pa-tê, chả lụa, thịt nguội, đồ chua, dưa leo, ngò và ớt – tuyệt tác giao thoa Pháp – Việt.",
            en: "A crackly baguette stuffed with pâté, Vietnamese ham, cold cuts, pickled carrot and daikon, cucumber, coriander and chilli – a French-Vietnamese masterpiece."
          }
        },
        {
          img: "img/com-tam.jpg",
          name: { vi: "Cơm tấm", en: "Broken rice with grilled pork" },
          taste: { vi: "Thơm khói, ngọt", en: "Smoky & sweet" },
          desc: {
            vi: "Hạt gạo tấm dẻo thơm ăn cùng sườn nướng, bì, chả trứng và nước mắm chua ngọt – bữa sáng quen thuộc của người Sài Gòn.",
            en: "Fragrant broken rice with a caramelised grilled pork chop, shredded pork skin, steamed egg meatloaf and sweet fish sauce – Saigon's favourite breakfast."
          }
        },
        {
          img: "hủ tiếu.jpg",
          name: { vi: "Hủ tiếu Nam Vang", en: "Phnom Penh-style noodle soup" },
          taste: { vi: "Ngọt thanh", en: "Light & sweet" },
          desc: {
            vi: "Nước dùng xương heo ngọt thanh, sợi hủ tiếu dai, tôm, thịt bằm, gan và trứng cút – có thể ăn nước hoặc khô.",
            en: "Chewy rice noodles in a sweet pork-bone broth with shrimp, minced pork, liver and quail eggs – served as a soup or “dry” with broth on the side."
          }
        }
      ],
      funfact: {
        vi: "Sài Gòn chính thức mang tên Thành phố Hồ Chí Minh từ năm 1976, nhưng người dân vẫn trìu mến gọi là “Sài Gòn”.",
        en: "Saigon was officially renamed Ho Chi Minh City in 1976, yet locals still lovingly call it “Sài Gòn”."
      },
      music: {
        title: { vi: "Đờn ca tài tử", en: "Southern Amateur Music" },
        subtitle: { vi: "Nhịp sống Sài Gòn", en: "Rhythm of Saigon" }
      }
    }
  },

  /* Thứ tự hành trình */
  regionOrder: ["north", "central", "south"],

  /* ------------------------------------------------------------------
     ĐIỂM ĐẾN KHÁC TRÊN BẢN ĐỒ  ·  OTHER GEMS ON THE MAP
     (x, y = vị trí theo % chiều rộng / chiều cao bản đồ)
     ------------------------------------------------------------------ */
  gems: [
    { x: 15.9, y: 6.5, name: { vi: "Sa Pa", en: "Sa Pa" }, desc: { vi: "Ruộng bậc thang và đỉnh Fansipan – “nóc nhà Đông Dương”.", en: "Rice terraces and Fansipan, the “Roof of Indochina”." } },
    { x: 46.5, y: 15.2, name: { vi: "Vịnh Hạ Long", en: "Ha Long Bay" }, desc: { vi: "Hàng nghìn đảo đá vôi kỳ vĩ – Di sản thiên nhiên thế giới.", en: "Thousands of limestone islands – a UNESCO World Heritage Site." } },
    { x: 35.4, y: 19.8, name: { vi: "Tràng An – Ninh Bình", en: "Trang An – Ninh Binh" }, desc: { vi: "Núi đá vôi, hang động và đò trên sông – di sản hỗn hợp UNESCO.", en: "Karst peaks, caves and rowing boats – a UNESCO mixed heritage site." } },
    { x: 39.0, y: 36.2, name: { vi: "Phong Nha – Kẻ Bàng", en: "Phong Nha – Ke Bang" }, desc: { vi: "Vương quốc hang động, nơi có Sơn Đoòng – hang lớn nhất thế giới.", en: "A kingdom of caves, home to Sơn Đoòng, the world's largest cave." } },
    { x: 58.2, y: 46.9, name: { vi: "Phố cổ Hội An", en: "Hoi An Ancient Town" }, desc: { vi: "Phố đèn lồng lung linh – Di sản thế giới UNESCO 1999.", en: "A lantern-lit trading port – UNESCO World Heritage since 1999." } },
    { x: 59.0, y: 71.4, name: { vi: "Đà Lạt", en: "Da Lat" }, desc: { vi: "Thành phố ngàn hoa trên cao nguyên Lâm Viên.", en: "The city of flowers on the cool Lâm Viên plateau." } },
    { x: 34.1, y: 83.3, name: { vi: "Cần Thơ – Miền Tây", en: "Can Tho – Mekong Delta" }, desc: { vi: "Chợ nổi Cái Răng và những miệt vườn sông nước.", en: "Cái Răng floating market and orchard-lined canals." } },
    { x: 17.0, y: 82.1, name: { vi: "Đảo Phú Quốc", en: "Phu Quoc Island" }, desc: { vi: "Đảo ngọc với biển xanh và hoàng hôn rực rỡ.", en: "The “Pearl Island” – turquoise sea and glorious sunsets." } }
  ],

  /* ------------------------------------------------------------------
     CÂU NÓI THÔNG DỤNG  ·  PHRASEBOOK
     say = cách đọc gần đúng cho người nói tiếng Anh (giọng Bắc)
     ------------------------------------------------------------------ */
  phraseCats: [
    { id: "all", icon: "fa-border-all", name: { vi: "Tất cả", en: "All" } },
    { id: "greet", icon: "fa-hands-praying", name: { vi: "Chào hỏi", en: "Greetings" } },
    { id: "food", icon: "fa-utensils", name: { vi: "Ăn uống", en: "Food & drink" } },
    { id: "shop", icon: "fa-bag-shopping", name: { vi: "Mua sắm", en: "Shopping" } },
    { id: "go", icon: "fa-person-walking-luggage", name: { vi: "Đi lại", en: "Getting around" } },
    { id: "help", icon: "fa-kit-medical", name: { vi: "Khẩn cấp", en: "Emergencies" } }
  ],
  phrases: [
    { cat: "greet", vi: "Xin chào", say: "sin chow", en: "Hello" },
    { cat: "greet", vi: "Cảm ơn", say: "gahm uhn", en: "Thank you" },
    { cat: "greet", vi: "Cảm ơn nhiều", say: "gahm uhn nyew", en: "Thank you very much" },
    { cat: "greet", vi: "Xin lỗi", say: "sin loy", en: "Sorry / Excuse me" },
    { cat: "greet", vi: "Tạm biệt", say: "tahm bee-et", en: "Goodbye" },
    { cat: "greet", vi: "Vâng / Dạ", say: "vuhng / yah", en: "Yes (polite)" },
    { cat: "greet", vi: "Không", say: "khohm", en: "No" },
    { cat: "greet", vi: "Bạn khỏe không?", say: "bahn kweh khohm?", en: "How are you?" },
    { cat: "greet", vi: "Tôi tên là…", say: "toy ten lah…", en: "My name is…" },
    { cat: "food", vi: "Ngon quá!", say: "ngon kwah!", en: "So delicious!" },
    { cat: "food", vi: "Cho tôi xem thực đơn", say: "chaw toy sem tuk dun", en: "May I see the menu?" },
    { cat: "food", vi: "Không cay", say: "khohm kai", en: "Not spicy, please" },
    { cat: "food", vi: "Tôi ăn chay", say: "toy an chai", en: "I'm vegetarian" },
    { cat: "food", vi: "Một cà phê sữa đá", say: "moht kah-feh suh-ah dah", en: "One iced milk coffee" },
    { cat: "food", vi: "Tính tiền", say: "ting tee-en", en: "The bill, please" },
    { cat: "food", vi: "Một, hai, ba, dô!", say: "moht, hai, bah, yo!", en: "One, two, three, cheers!" },
    { cat: "shop", vi: "Cái này bao nhiêu tiền?", say: "kai nay bow nyew tee-en?", en: "How much is this?" },
    { cat: "shop", vi: "Đắt quá!", say: "daht kwah!", en: "Too expensive!" },
    { cat: "shop", vi: "Bớt chút được không?", say: "buht choot duhk khohm?", en: "Can you lower the price?" },
    { cat: "shop", vi: "Tôi chỉ xem thôi", say: "toy chee sem toy", en: "I'm just looking" },
    { cat: "go", vi: "Nhà vệ sinh ở đâu?", say: "nyah veh sin uh dow?", en: "Where is the toilet?" },
    { cat: "go", vi: "Rẽ trái", say: "zeh chai", en: "Turn left" },
    { cat: "go", vi: "Rẽ phải", say: "zeh fai", en: "Turn right" },
    { cat: "go", vi: "Đi thẳng", say: "dee tahng", en: "Go straight" },
    { cat: "go", vi: "Dừng ở đây", say: "zung uh day", en: "Stop here, please" },
    { cat: "help", vi: "Cứu tôi với!", say: "kew toy vuh-ee!", en: "Help me!" },
    { cat: "help", vi: "Tôi bị lạc", say: "toy bee lahk", en: "I'm lost" },
    { cat: "help", vi: "Gọi cấp cứu!", say: "goy kuhp kew!", en: "Call an ambulance!" },
    { cat: "help", vi: "Tôi cần bác sĩ", say: "toy kuhn bahk see", en: "I need a doctor" }
  ],

  /* 6 thanh điệu  ·  6 tones */
  tones: [
    { word: "ma", tone: { vi: "Thanh ngang", en: "Level tone" }, mean: { vi: "con ma", en: "ghost" }, curve: "M4 14 H56" },
    { word: "mà", tone: { vi: "Thanh huyền", en: "Falling tone" }, mean: { vi: "nhưng mà", en: "but" }, curve: "M4 10 L56 22" },
    { word: "má", tone: { vi: "Thanh sắc", en: "Rising tone" }, mean: { vi: "mẹ (miền Nam), gò má", en: "mother (South), cheek" }, curve: "M4 18 L56 4" },
    { word: "mả", tone: { vi: "Thanh hỏi", en: "Dipping tone" }, mean: { vi: "mồ mả", en: "tomb" }, curve: "M4 12 Q28 30 56 10" },
    { word: "mã", tone: { vi: "Thanh ngã", en: "Broken tone" }, mean: { vi: "con ngựa (Hán Việt), mã số", en: "horse (Sino-Viet.), code" }, curve: "M4 14 L24 10 M32 18 L56 3" },
    { word: "mạ", tone: { vi: "Thanh nặng", en: "Heavy tone" }, mean: { vi: "cây mạ (lúa non)", en: "rice seedling" }, curve: "M4 12 L50 24" }
  ],

  /* ------------------------------------------------------------------
     12 CON GIÁP  ·  VIETNAMESE ZODIAC
     ------------------------------------------------------------------ */
  stems: ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"],
  zodiac: [
    { branch: "Tý", emoji: "🐀", name: { vi: "Chuột", en: "Rat" }, trait: { vi: "Nhanh nhạy, khéo léo, biết vun vén", en: "Quick-witted, resourceful and thrifty" } },
    { branch: "Sửu", emoji: "🐃", name: { vi: "Trâu", en: "Water Buffalo" }, trait: { vi: "Chăm chỉ, kiên nhẫn, đáng tin cậy", en: "Hard-working, patient and dependable" }, note: { vi: "Người Việt dùng con Trâu – bạn của nhà nông – thay cho con Bò.", en: "Vietnam honours the water buffalo, the rice farmer's best friend, instead of the ox." } },
    { branch: "Dần", emoji: "🐅", name: { vi: "Hổ", en: "Tiger" }, trait: { vi: "Dũng cảm, tự tin, mạnh mẽ", en: "Brave, confident and powerful" } },
    { branch: "Mão", emoji: "🐈", name: { vi: "Mèo", en: "Cat" }, trait: { vi: "Tinh tế, dịu dàng, khéo giao tiếp", en: "Graceful, gentle and diplomatic" }, note: { vi: "Điểm đặc biệt: Việt Nam có con Mèo thay cho con Thỏ!", en: "Unique to Vietnam: the Cat takes the place of the Rabbit!" } },
    { branch: "Thìn", emoji: "🐉", name: { vi: "Rồng", en: "Dragon" }, trait: { vi: "Uy quyền, tham vọng, may mắn", en: "Charismatic, ambitious and lucky" } },
    { branch: "Tỵ", emoji: "🐍", name: { vi: "Rắn", en: "Snake" }, trait: { vi: "Thông thái, bí ẩn, điềm tĩnh", en: "Wise, mysterious and calm" } },
    { branch: "Ngọ", emoji: "🐎", name: { vi: "Ngựa", en: "Horse" }, trait: { vi: "Tự do, nhiệt huyết, thích phiêu lưu", en: "Free-spirited, energetic and adventurous" } },
    { branch: "Mùi", emoji: "🐐", name: { vi: "Dê", en: "Goat" }, trait: { vi: "Hiền hòa, nghệ sĩ, giàu lòng trắc ẩn", en: "Gentle, artistic and compassionate" }, note: { vi: "Ở Việt Nam, năm Mùi là năm con Dê (không phải con Cừu).", en: "In Vietnam the year of Mùi is the Goat, not the Sheep." } },
    { branch: "Thân", emoji: "🐒", name: { vi: "Khỉ", en: "Monkey" }, trait: { vi: "Lanh lợi, hài hước, sáng tạo", en: "Clever, playful and inventive" } },
    { branch: "Dậu", emoji: "🐓", name: { vi: "Gà", en: "Rooster" }, trait: { vi: "Chăm chỉ, thẳng thắn, đúng giờ", en: "Diligent, honest and punctual" } },
    { branch: "Tuất", emoji: "🐕", name: { vi: "Chó", en: "Dog" }, trait: { vi: "Trung thành, chính trực, tốt bụng", en: "Loyal, upright and kind-hearted" } },
    { branch: "Hợi", emoji: "🐖", name: { vi: "Lợn", en: "Pig" }, trait: { vi: "Hào phóng, chân thành, lạc quan", en: "Generous, sincere and easy-going" } }
  ],
  /* Ngũ hành nạp âm – 30 cặp năm trong chu kỳ 60 năm (bắt đầu từ Giáp Tý) */
  elements: {
    kim: { vi: "Kim", en: "Metal", color: "#C9A43B" },
    moc: { vi: "Mộc", en: "Wood", color: "#3F8F4E" },
    thuy: { vi: "Thủy", en: "Water", color: "#2E6FA8" },
    hoa: { vi: "Hỏa", en: "Fire", color: "#D2462F" },
    tho: { vi: "Thổ", en: "Earth", color: "#9A6B3A" }
  },
  napam: [
    { vi: "Hải Trung Kim", en: "Gold in the Sea", el: "kim" },
    { vi: "Lư Trung Hỏa", en: "Fire in the Furnace", el: "hoa" },
    { vi: "Đại Lâm Mộc", en: "Wood of the Great Forest", el: "moc" },
    { vi: "Lộ Bàng Thổ", en: "Roadside Earth", el: "tho" },
    { vi: "Kiếm Phong Kim", en: "Sword-edge Metal", el: "kim" },
    { vi: "Sơn Đầu Hỏa", en: "Mountain-top Fire", el: "hoa" },
    { vi: "Giản Hạ Thủy", en: "Stream Water", el: "thuy" },
    { vi: "Thành Đầu Thổ", en: "City-wall Earth", el: "tho" },
    { vi: "Bạch Lạp Kim", en: "White Wax Metal", el: "kim" },
    { vi: "Dương Liễu Mộc", en: "Willow Wood", el: "moc" },
    { vi: "Tuyền Trung Thủy", en: "Spring Water", el: "thuy" },
    { vi: "Ốc Thượng Thổ", en: "Rooftop Earth", el: "tho" },
    { vi: "Tích Lịch Hỏa", en: "Thunderbolt Fire", el: "hoa" },
    { vi: "Tùng Bách Mộc", en: "Pine & Cypress Wood", el: "moc" },
    { vi: "Trường Lưu Thủy", en: "Long-flowing Water", el: "thuy" },
    { vi: "Sa Trung Kim", en: "Gold in the Sand", el: "kim" },
    { vi: "Sơn Hạ Hỏa", en: "Fire at the Mountain Foot", el: "hoa" },
    { vi: "Bình Địa Mộc", en: "Flatland Wood", el: "moc" },
    { vi: "Bích Thượng Thổ", en: "Wall Earth", el: "tho" },
    { vi: "Kim Bạch Kim", en: "Gold-foil Metal", el: "kim" },
    { vi: "Phú Đăng Hỏa", en: "Lamp Fire", el: "hoa" },
    { vi: "Thiên Hà Thủy", en: "Heavenly River Water", el: "thuy" },
    { vi: "Đại Trạch Thổ", en: "Great Post-station Earth", el: "tho" },
    { vi: "Thoa Xuyến Kim", en: "Hairpin & Bracelet Gold", el: "kim" },
    { vi: "Tang Đố Mộc", en: "Mulberry Wood", el: "moc" },
    { vi: "Đại Khê Thủy", en: "Great Stream Water", el: "thuy" },
    { vi: "Sa Trung Thổ", en: "Sandy Earth", el: "tho" },
    { vi: "Thiên Thượng Hỏa", en: "Heavenly Fire", el: "hoa" },
    { vi: "Thạch Lựu Mộc", en: "Pomegranate Wood", el: "moc" },
    { vi: "Đại Hải Thủy", en: "Great Ocean Water", el: "thuy" }
  ],

  /* ------------------------------------------------------------------
     LỄ HỘI  ·  FESTIVALS
     ------------------------------------------------------------------ */
  /* Ngày mùng 1 Tết Nguyên Đán theo dương lịch */
  tetDates: ["2025-01-29", "2026-02-17", "2027-02-06", "2028-01-26", "2029-02-13", "2030-02-03", "2031-01-23"],
  festivals: [
    {
      icon: "fa-dragon", color: "#C8161D",
      name: { vi: "Tết Nguyên Đán", en: "Tết – Lunar New Year" },
      lunar: { vi: "Mùng 1 tháng Giêng", en: "1st day, 1st lunar month" },
      when: { vi: "Cuối tháng 1 – tháng 2", en: "Late Jan – Feb" },
      desc: {
        vi: "Lễ hội lớn nhất năm: sum họp gia đình, gói bánh chưng, chưng hoa đào (miền Bắc) và hoa mai (miền Nam), mừng tuổi bằng bao lì xì đỏ.",
        en: "The biggest celebration of the year: families reunite, wrap square sticky-rice cakes, decorate with peach blossom in the North and yellow apricot blossom in the South, and hand out red lucky-money envelopes."
      }
    },
    {
      icon: "fa-water", color: "#2E6FA8",
      name: { vi: "Lễ hội Chùa Hương", en: "Perfume Pagoda Festival" },
      lunar: { vi: "Khai hội mùng 6 tháng Giêng", en: "Opens 6th day, 1st lunar month" },
      when: { vi: "Tháng 2 – 4", en: "Feb – Apr" },
      desc: {
        vi: "Hàng triệu người hành hương ngồi đò trên suối Yến tới động Hương Tích (Hà Nội) – mùa lễ hội chùa dài nhất Việt Nam.",
        en: "Millions of pilgrims glide by rowing boat along Yến Stream to Hương Tích Cave near Hanoi – Vietnam's longest pagoda festival season."
      }
    },
    {
      icon: "fa-mountain-sun", color: "#9A6B3A",
      name: { vi: "Giỗ Tổ Hùng Vương", en: "Hùng Kings' Commemoration" },
      lunar: { vi: "Mùng 10 tháng 3", en: "10th day, 3rd lunar month" },
      when: { vi: "Tháng 4", en: "April" },
      desc: {
        vi: "Ngày toàn dân tưởng nhớ các Vua Hùng dựng nước, lễ chính tại Đền Hùng (Phú Thọ). Tín ngưỡng thờ cúng Hùng Vương là di sản UNESCO (2012).",
        en: "A national holiday honouring the legendary Hùng Kings, founders of the nation, centred on the Hùng Temple in Phú Thọ. The worship of the Hùng Kings is UNESCO-listed (2012)."
      }
    },
    {
      icon: "fa-sun", color: "#D88A1E",
      name: { vi: "Tết Đoan Ngọ", en: "Đoan Ngọ – Mid-Year Festival" },
      lunar: { vi: "Mùng 5 tháng 5", en: "5th day, 5th lunar month" },
      when: { vi: "Tháng 6", en: "June" },
      desc: {
        vi: "“Tết diệt sâu bọ”: sáng sớm cả nhà ăn hoa quả, rượu nếp, bánh tro để cầu sức khỏe nửa năm còn lại.",
        en: "The “pest-killing” festival: early in the morning families eat fruit, fermented sticky rice and ash cakes for good health in the second half of the year."
      }
    },
    {
      icon: "fa-hand-holding-heart", color: "#C2457A",
      name: { vi: "Lễ Vu Lan", en: "Vu Lan – Parents' Gratitude Day" },
      lunar: { vi: "Rằm tháng 7", en: "15th day, 7th lunar month" },
      when: { vi: "Tháng 8 – 9", en: "Aug – Sep" },
      desc: {
        vi: "Mùa báo hiếu: con cháu cài hoa hồng trên áo để tri ân cha mẹ; chùa chiền làm lễ cầu siêu cho ông bà tổ tiên.",
        en: "A season of filial gratitude: people pin a rose to their shirt to honour their parents, and pagodas hold prayers for ancestors."
      }
    },
    {
      icon: "fa-flag", color: "#C8161D",
      name: { vi: "Quốc khánh", en: "National Day" },
      lunar: { vi: "Ngày 2/9 dương lịch", en: "2 September (solar)" },
      when: { vi: "Tháng 9", en: "September" },
      desc: {
        vi: "Kỷ niệm ngày Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập năm 1945; phố phường rực rỡ cờ hoa.",
        en: "Commemorates President Hồ Chí Minh's Declaration of Independence in 1945; streets are dressed in red flags and flowers."
      }
    },
    {
      icon: "fa-moon", color: "#C98A1B",
      name: { vi: "Tết Trung Thu", en: "Mid-Autumn Festival" },
      lunar: { vi: "Rằm tháng 8", en: "15th day, 8th lunar month" },
      when: { vi: "Tháng 9 – 10", en: "Sep – Oct" },
      desc: {
        vi: "Tết của thiếu nhi: rước đèn ông sao, phá cỗ trông trăng, ăn bánh nướng, bánh dẻo và xem múa lân rộn ràng.",
        en: "The children's festival: kids parade star-shaped lanterns, feast under the full moon on mooncakes and watch drum-pounding lion dances."
      }
    },
    {
      icon: "fa-sailboat", color: "#1F6B52",
      name: { vi: "Lễ hội Ok Om Bok", en: "Ok Om Bok – Khmer Moon Festival" },
      lunar: { vi: "Rằm tháng 10", en: "15th day, 10th lunar month" },
      when: { vi: "Tháng 11", en: "November" },
      desc: {
        vi: "Lễ cúng trăng của đồng bào Khmer Nam Bộ ở Sóc Trăng, nổi bật với giải đua ghe ngo sôi động trên sông Maspero.",
        en: "The moon-worship festival of the Khmer community in Sóc Trăng, famous for thrilling ngo boat races on the Maspero River."
      }
    },
    {
      icon: "fa-lightbulb", color: "#D2462F",
      name: { vi: "Đêm rằm phố Hội", en: "Hội An Lantern Night" },
      lunar: { vi: "Đêm 14 âm lịch hằng tháng", en: "14th night of every lunar month" },
      when: { vi: "Hằng tháng", en: "Every month" },
      desc: {
        vi: "Phố cổ Hội An tắt đèn điện, chỉ còn ánh đèn lồng lụa và hoa đăng lung linh trôi trên sông Hoài.",
        en: "Hội An's old town switches off its electric lights, leaving only silk lanterns and floating candles drifting on the Hoài River."
      }
    }
  ],
  tetCustoms: [
    { emoji: "🟩", name: { vi: "Bánh chưng", en: "Bánh chưng" }, desc: { vi: "Bánh gạo nếp vuông tượng trưng cho đất, gói bằng lá dong.", en: "Square sticky-rice cake symbolising the Earth, wrapped in dong leaves." } },
    { emoji: "🧧", name: { vi: "Lì xì", en: "Lucky money" }, desc: { vi: "Bao đỏ mừng tuổi kèm lời chúc may mắn cho trẻ em và người già.", en: "Red envelopes with crisp new notes for children and elders." } },
    { emoji: "🌸", name: { vi: "Hoa đào – hoa mai", en: "Peach & apricot blossom" }, desc: { vi: "Đào hồng miền Bắc, mai vàng miền Nam – sắc xuân trong mỗi nhà.", en: "Pink peach in the North, golden apricot in the South – spring in every home." } },
    { emoji: "🚪", name: { vi: "Xông đất", en: "First-footing" }, desc: { vi: "Người đầu tiên bước vào nhà ngày mùng 1 mang vận may cả năm.", en: "The first visitor on New Year's Day sets the family's luck for the year." } },
    { emoji: "📜", name: { vi: "Câu đối đỏ", en: "Red couplets" }, desc: { vi: "Ông đồ viết thư pháp lời chúc trên giấy đỏ để treo trong nhà.", en: "Calligraphers brush New Year wishes onto red paper to hang at home." } }
  ],
  tetGreetings: [
    { vi: "Chúc mừng năm mới!", en: "Happy New Year!" },
    { vi: "An khang thịnh vượng", en: "Peace and prosperity" },
    { vi: "Vạn sự như ý", en: "May all your wishes come true" }
  ],

  /* ------------------------------------------------------------------
     CẨM NANG  ·  TRAVEL TIPS
     ------------------------------------------------------------------ */
  etiquette: [
    { ok: true, icon: "fa-shirt", title: { vi: "Ăn mặc kín đáo khi vào chùa", en: "Dress modestly at temples" }, text: { vi: "Che vai và đầu gối khi vào chùa, đền; cởi giày dép nếu thấy người dân để giày bên ngoài.", en: "Cover shoulders and knees at pagodas and temples, and take off your shoes if you see others doing so." } },
    { ok: true, icon: "fa-hands", title: { vi: "Đưa và nhận bằng hai tay", en: "Give & receive with both hands" }, text: { vi: "Đặc biệt với người lớn tuổi – đây là cử chỉ thể hiện sự tôn trọng.", en: "Especially with elders – it is a simple sign of respect." } },
    { ok: true, icon: "fa-comment-dots", title: { vi: "Chào bằng tiếng Việt", en: "Greet in Vietnamese" }, text: { vi: "Một câu “Xin chào” hay “Cảm ơn” sẽ đổi lại nụ cười rạng rỡ.", en: "A simple “Xin chào” or “Cảm ơn” will earn you the warmest smiles." } },
    { ok: true, icon: "fa-scale-balanced", title: { vi: "Mặc cả nhẹ nhàng", en: "Bargain with a smile" }, text: { vi: "Ở chợ, trả giá là bình thường nhưng hãy vui vẻ, lịch sự. Cửa hàng niêm yết giá thì không cần.", en: "Haggling is normal at markets – keep it friendly. Fixed-price shops don't bargain." } },
    { ok: false, icon: "fa-bowl-rice", title: { vi: "Cắm đũa thẳng đứng vào bát cơm", en: "Stick chopsticks upright in rice" }, text: { vi: "Hình ảnh này giống bát nhang cúng người đã khuất.", en: "It looks like the incense offered to the dead." } },
    { ok: false, icon: "fa-child-reaching", title: { vi: "Xoa đầu người khác", en: "Touch someone's head" }, text: { vi: "Đầu được xem là phần thiêng liêng nhất của cơ thể, kể cả với trẻ em.", en: "The head is considered the most sacred part of the body – even for children." } },
    { ok: false, icon: "fa-hand-point-up", title: { vi: "Ngoắc tay gọi người", en: "Beckon with a finger" }, text: { vi: "Hãy úp lòng bàn tay xuống và vẫy nhẹ; ngoắc ngón tay bị coi là bất lịch sự.", en: "Wave with your palm facing down; curling a finger is considered rude." } },
    { ok: false, icon: "fa-face-angry", title: { vi: "Nổi nóng nơi công cộng", en: "Lose your temper in public" }, text: { vi: "Người Việt coi trọng thể diện; giữ bình tĩnh và mỉm cười sẽ giải quyết mọi việc dễ hơn.", en: "Saving face matters – staying calm and smiling gets things done far more easily." } }
  ],
  /* Mức độ phù hợp theo tháng: 1 = lý tưởng, 2 = khá, 3 = mưa nhiều hoặc rất nóng */
  seasons: [
    { region: "north", months: [2, 2, 1, 1, 2, 3, 3, 3, 1, 1, 1, 2], note: { vi: "Mùa thu Hà Nội (tháng 9 – 11) đẹp nhất; mùa đông có thể lạnh dưới 10°C.", en: "Hanoi's autumn (Sep – Nov) is magical; winter can dip below 10°C." } },
    { region: "central", months: [2, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3], note: { vi: "Tránh tháng 9 – 12 vì mưa lớn và bão; mùa xuân trong lành, dễ chịu.", en: "Avoid Sep – Dec (heavy rain, typhoons); spring is fresh and pleasant." } },
    { region: "south", months: [1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 2, 1], note: { vi: "Mùa mưa có những cơn mưa rào ngắn buổi chiều – đừng quên áo mưa!", en: "Rainy-season showers are short afternoon bursts – just carry a poncho!" } }
  ],
  practical: [
    { icon: "fa-money-bill-wave", title: { vi: "Tiền tệ", en: "Money" }, text: { vi: "Đơn vị tiền là Đồng (₫). Tờ 20.000₫ và 500.000₫ cùng màu xanh – hãy kiểm tra kỹ khi trả tiền. Người Việt hay nói “100k” thay cho 100.000₫.", en: "The currency is the Đồng (₫). The 20,000₫ and 500,000₫ notes are both blue – double-check before paying. Locals say “100k” for 100,000₫." } },
    { icon: "fa-motorcycle", title: { vi: "Đi lại", en: "Getting around" }, text: { vi: "Dùng ứng dụng gọi xe (Grab, Be, Xanh SM) để biết trước giá. Khi băng qua đường: đi chậm, đều, đừng chạy – xe sẽ tránh bạn.", en: "Use ride-hailing apps (Grab, Be, Xanh SM) for upfront prices. Crossing the street: walk slowly and steadily, never run – traffic flows around you." } },
    { icon: "fa-phone-volume", title: { vi: "Số khẩn cấp", en: "Emergency numbers" }, text: { vi: "Công an 113 · Cứu hỏa 114 · Cấp cứu 115. Lưu lại địa chỉ khách sạn bằng tiếng Việt để đưa cho tài xế.", en: "Police 113 · Fire 114 · Ambulance 115. Keep your hotel address in Vietnamese to show drivers." } },
    { icon: "fa-passport", title: { vi: "Thị thực", en: "Visa" }, text: { vi: "Nhiều quốc tịch được miễn thị thực ngắn hạn; số khác có thể xin e-visa trực tuyến. Luôn kiểm tra quy định mới nhất trên cổng thông tin chính thức.", en: "Many nationalities enjoy visa-free short stays; others can apply for an e-visa online. Always check the latest rules on the official government portal." } },
    { icon: "fa-hand-holding-dollar", title: { vi: "Tiền boa", en: "Tipping" }, text: { vi: "Không bắt buộc nhưng luôn được trân trọng, đặc biệt với hướng dẫn viên, tài xế và nhân viên spa.", en: "Not required but always appreciated – especially for tour guides, drivers and spa staff." } },
    { icon: "fa-sim-card", title: { vi: "SIM & Internet", en: "SIM & internet" }, text: { vi: "Mua SIM du lịch hoặc eSIM ngay tại sân bay (Viettel, Vinaphone, Mobifone) – sóng 4G phủ rộng, giá rẻ; quán cà phê nào cũng có Wi-Fi.", en: "Pick up a tourist SIM or eSIM at the airport (Viettel, Vinaphone, Mobifone) – 4G coverage is wide and cheap, and every café has Wi-Fi." } }
  ],

  /* ------------------------------------------------------------------
     ĐỐ VUI  ·  QUIZ  (mỗi lượt chọn ngẫu nhiên 10 câu)
     answer = vị trí đáp án đúng (bắt đầu từ 0)
     ------------------------------------------------------------------ */
  quiz: [
    {
      q: { vi: "Năm 1010, vua Lý Thái Tổ dời đô về Thăng Long. Ngày nay đó là thành phố nào?", en: "In 1010, Emperor Lý Thái Tổ moved the capital to Thăng Long. What is it called today?" },
      options: [{ vi: "Huế", en: "Hue" }, { vi: "Hà Nội", en: "Hanoi" }, { vi: "Hội An", en: "Hoi An" }, { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" }],
      answer: 1,
      explain: { vi: "Thăng Long nghĩa là “rồng bay lên” – tên xưa của Hà Nội.", en: "Thăng Long means “Ascending Dragon” – Hanoi's ancient name." }
    },
    {
      q: { vi: "Loại hình nghệ thuật truyền thống nào được biểu diễn trên mặt nước?", en: "Which traditional art form is performed on water?" },
      options: [{ vi: "Múa rối nước", en: "Water puppetry" }, { vi: "Ca trù", en: "Ca trù singing" }, { vi: "Hát chèo", en: "Chèo theatre" }, { vi: "Múa lân", en: "Lion dance" }],
      answer: 0,
      explain: { vi: "Múa rối nước ra đời ở đồng bằng sông Hồng khoảng thế kỷ XI.", en: "Water puppetry was born in the Red River Delta around the 11th century." }
    },
    {
      q: { vi: "Trong 12 con giáp của Việt Nam, con vật nào thay cho con Thỏ?", en: "In the Vietnamese zodiac, which animal replaces the Rabbit?" },
      options: [{ vi: "Con Cáo", en: "Fox" }, { vi: "Con Gấu", en: "Bear" }, { vi: "Con Mèo", en: "Cat" }, { vi: "Con Sóc", en: "Squirrel" }],
      answer: 2,
      explain: { vi: "Người Việt có con Mèo (Mão) thay cho Thỏ, và con Trâu thay cho Bò.", en: "Vietnam has the Cat (Mão) instead of the Rabbit – and the Water Buffalo instead of the Ox." }
    },
    {
      q: { vi: "Nhã nhạc cung đình Huế được UNESCO vinh danh vào năm nào?", en: "In which year did UNESCO honour Hue Royal Court Music?" },
      options: [{ vi: "1993", en: "1993" }, { vi: "2003", en: "2003" }, { vi: "2013", en: "2013" }, { vi: "2020", en: "2020" }],
      answer: 1,
      explain: { vi: "Năm 2003 – di sản phi vật thể đầu tiên của Việt Nam được UNESCO công nhận.", en: "2003 – Vietnam's first intangible heritage recognised by UNESCO." }
    },
    {
      q: { vi: "“Cảm ơn” trong tiếng Anh nghĩa là gì?", en: "What does “Cảm ơn” mean?" },
      options: [{ vi: "Hello", en: "Hello" }, { vi: "Goodbye", en: "Goodbye" }, { vi: "Sorry", en: "Sorry" }, { vi: "Thank you", en: "Thank you" }],
      answer: 3,
      explain: { vi: "“Cảm ơn” (gahm uhn) – câu nói khiến ai cũng mỉm cười.", en: "“Cảm ơn” (gahm uhn) – the phrase that makes everyone smile." }
    },
    {
      q: { vi: "Đặc sản cà phê nào của Hà Nội được phủ lớp kem trứng béo ngậy?", en: "Which Hanoi coffee specialty is topped with a creamy whipped-egg foam?" },
      options: [{ vi: "Cà phê muối", en: "Salt coffee" }, { vi: "Cà phê trứng", en: "Egg coffee" }, { vi: "Cà phê dừa", en: "Coconut coffee" }, { vi: "Bạc xỉu", en: "Bạc xỉu (milky coffee)" }],
      answer: 1,
      explain: { vi: "Cà phê trứng ra đời năm 1946 tại Hà Nội.", en: "Egg coffee was invented in Hanoi in 1946." }
    },
    {
      q: { vi: "Tết Trung Thu diễn ra vào ngày nào?", en: "When is the Mid-Autumn Festival celebrated?" },
      options: [{ vi: "Mùng 1 tháng Giêng âm lịch", en: "1st day of the 1st lunar month" }, { vi: "Rằm tháng 8 âm lịch", en: "15th day of the 8th lunar month" }, { vi: "Mùng 10 tháng 3 âm lịch", en: "10th day of the 3rd lunar month" }, { vi: "Ngày 2/9 dương lịch", en: "2 September" }],
      answer: 1,
      explain: { vi: "Đêm rằm tháng Tám, khi trăng tròn và sáng nhất năm.", en: "On the full-moon night of the 8th lunar month, when the moon is at its brightest." }
    },
    {
      q: { vi: "Chợ Bến Thành nằm ở thành phố nào?", en: "Where is Ben Thanh Market?" },
      options: [{ vi: "Hà Nội", en: "Hanoi" }, { vi: "Đà Nẵng", en: "Da Nang" }, { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" }, { vi: "Cần Thơ", en: "Can Tho" }],
      answer: 2,
      explain: { vi: "Chợ khánh thành năm 1914 và là biểu tượng của Sài Gòn.", en: "Opened in 1914, it is an icon of Saigon." }
    },
    {
      q: { vi: "Vì sao không nên cắm đũa thẳng đứng vào bát cơm?", en: "Why shouldn't you stick chopsticks upright in a bowl of rice?" },
      options: [{ vi: "Vì dễ làm gãy đũa", en: "It breaks the chopsticks" }, { vi: "Vì giống bát nhang cúng người đã khuất", en: "It looks like incense for the dead" }, { vi: "Vì nghĩa là đã ăn xong", en: "It means you've finished" }, { vi: "Vì chỉ dành cho nhà vua", en: "It's reserved for kings" }],
      answer: 1,
      explain: { vi: "Đó là hình ảnh của lễ cúng, nên được xem là điều kiêng kỵ trong bữa ăn.", en: "It evokes a funeral offering, so it's taboo at the table." }
    },
    {
      q: { vi: "Việt Nam có bao nhiêu dân tộc anh em?", en: "How many ethnic groups are officially recognised in Vietnam?" },
      options: [{ vi: "36", en: "36" }, { vi: "54", en: "54" }, { vi: "63", en: "63" }, { vi: "100", en: "100" }],
      answer: 1,
      explain: { vi: "54 dân tộc, trong đó người Kinh chiếm khoảng 85% dân số.", en: "54 groups – the Kinh majority make up about 85% of the population." }
    },
    {
      q: { vi: "Văn Miếu – Quốc Tử Giám nổi tiếng là…", en: "The Temple of Literature is famous as Vietnam's first…" },
      options: [{ vi: "Cung điện của nhà vua", en: "Royal palace" }, { vi: "Trường đại học đầu tiên", en: "National university" }, { vi: "Nhà thờ cổ nhất", en: "Cathedral" }, { vi: "Khu chợ đầu tiên", en: "Market" }],
      answer: 1,
      explain: { vi: "Quốc Tử Giám được lập năm 1076, ngay cạnh Văn Miếu.", en: "The Imperial Academy was founded in 1076 beside the temple." }
    },
    {
      q: { vi: "Đờn ca tài tử là di sản âm nhạc của vùng nào?", en: "Đờn ca tài tử is the musical heritage of which region?" },
      options: [{ vi: "Miền Bắc", en: "The North" }, { vi: "Miền Trung", en: "The Centre" }, { vi: "Miền Nam", en: "The South" }, { vi: "Tây Nguyên", en: "Central Highlands" }],
      answer: 2,
      explain: { vi: "UNESCO ghi danh Đờn ca tài tử Nam Bộ năm 2013.", en: "UNESCO inscribed Southern Đờn ca tài tử in 2013." }
    },
    {
      q: { vi: "Tháp Phước Duyên của chùa Thiên Mụ có bao nhiêu tầng?", en: "How many storeys does Thien Mu Pagoda's Phước Duyên tower have?" },
      options: [{ vi: "3", en: "3" }, { vi: "5", en: "5" }, { vi: "7", en: "7" }, { vi: "9", en: "9" }],
      answer: 2,
      explain: { vi: "Tháp 7 tầng được vua Thiệu Trị cho xây năm 1844.", en: "The seven-storey tower was built by Emperor Thiệu Trị in 1844." }
    },
    {
      q: { vi: "Dịp Tết, người lớn thường tặng trẻ em thứ gì?", en: "During Tết, what do adults traditionally give children?" },
      options: [{ vi: "Bánh trung thu", en: "Mooncakes" }, { vi: "Bao lì xì đỏ", en: "Red lucky-money envelopes" }, { vi: "Đèn ông sao", en: "Star lanterns" }, { vi: "Hoa hồng", en: "Roses" }],
      answer: 1,
      explain: { vi: "Lì xì đỏ mang theo lời chúc may mắn, hay ăn chóng lớn.", en: "Red envelopes carry wishes for luck and growing up healthy." }
    }
  ],
  /* Danh hiệu theo điểm (lấy cảm hứng từ khoa cử xưa) */
  ranks: [
    { min: 10, name: { vi: "Trạng Nguyên", en: "Trạng Nguyên – First Laureate" }, msg: { vi: "Tuyệt đối! Bạn xứng đáng được khắc tên lên bia đá Văn Miếu.", en: "Perfect! Your name deserves a stele at the Temple of Literature." } },
    { min: 8, name: { vi: "Bảng Nhãn", en: "Bảng Nhãn – Second Laureate" }, msg: { vi: "Xuất sắc! Bạn hiểu văn hóa Việt như người bản xứ.", en: "Excellent! You know Vietnam almost like a local." } },
    { min: 6, name: { vi: "Thám Hoa", en: "Thám Hoa – Third Laureate" }, msg: { vi: "Rất tốt! Thêm một chuyến đi nữa là thành chuyên gia.", en: "Great job! One more trip and you'll be an expert." } },
    { min: 0, name: { vi: "Sĩ Tử", en: "Sĩ Tử – Aspiring Scholar" }, msg: { vi: "Khởi đầu tốt! Hãy dạo thêm ba miền rồi thử lại nhé.", en: "A fine start! Explore the three regions again and retry." } }
  ],

  /* ------------------------------------------------------------------
     TỤC NGỮ  ·  PROVERBS
     ------------------------------------------------------------------ */
  proverbs: [
    { vi: "Đi một ngày đàng, học một sàng khôn.", en: "Travel for a day, and you'll gain a basketful of wisdom." },
    { vi: "Uống nước nhớ nguồn.", en: "When you drink water, remember its source." },
    { vi: "Lá lành đùm lá rách.", en: "The whole leaf wraps the torn one." },
    { vi: "Có công mài sắt, có ngày nên kim.", en: "Grind an iron bar long enough and it becomes a needle." },
    { vi: "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.", en: "One tree makes no hill; three trees together make a mountain." }
  ]
};
