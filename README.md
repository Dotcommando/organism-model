# Organism Model XML (OMXML)

> This README is available in other languages:
> - [Русский](README.ru.md)

## Project Goal

The goal of this project is to create an XML format that allows describing biological organisms at various levels. The levels supported by the schema include: Systems (musculoskeletal, digestive, nervous, etc.), Organs, Cells, and Organelles. It is not mandatory to describe an organism at the organelle level. For minimal use, it is sufficient to describe an organism at the system level. If you wish to simulate evolution focusing on specific organs, you can describe those at the cellular level, while keeping other systems at the organism-level systems. In computer simulations of evolution, OMXML serves as the equivalent of amino acids and proteins.

Moreover, you can begin evolution with organisms described at the Systems level and later intervene to detail specific systems down to sets of organs or even cells. For example, when a species stabilizes, and the majority of individuals become viable, you can focus on a particular system of the organism and further detail it. Systems detailed to organs or cells will produce/store/transport the same amount of hormones/substances as the higher-level Systems did before intervention. This approach can save processing time. Your planet will thank you! :)

## Genome

Organism Model XML does not include genes. It is assumed that you will create your own encoding system that simulates genes, with OMXML documents being the output of genome execution on a computer.

## Chemistry

The description of an organism implies a minimal description of the basic chemical components of the world. Chemical reactions between these components should be described outside the OMXML document, as the reactions are unrelated to the organism. An example of describing the basic chemical components of the world:

```xml
    <Resources>
    <!-- Simple resources -->
    <resource name="lightEnergy" type="simple"/>
    <resource name="oxygen" type="simple"/>
    <resource name="carbon" type="simple"/>
    <resource name="nitrogen" type="simple"/>
    <resource name="phosphorus" type="simple"/>
    <resource name="potassium" type="simple"/>
    <resource name="water" type="simple"/>

    <!-- Complex resources -->
    <resource name="carbonDioxide" type="complex"/>
    <resource name="glucose" type="complex"/>
    <resource name="ATP" type="complex"/>
    <resource name="livingPlantOrganic" type="complex"/>
    <resource name="deadPlantOrganic" type="complex"/>
    <resource name="livingAnimalOrganic" type="complex"/>
    <resource name="deadAnimalOrganic" type="complex"/>
    <resource name="excrement" type="complex"/>
</Resources>
```

## Principles of OMXML

1. A document simultaneously serves as a description of a species and an individual with specific characteristics, similar to how an animal's body contains proteins characteristic of the entire species, as well as individual anatomical features that distinguish an individual from the population.
2. The concept of layers. An organism can be described at any level: Organism, System, Organ, Cell, Organelle. However, if a researcher decides to describe the cells of a particular organ, then all higher layers must be described. That is, if a researcher describes organelles, there must be a cell of which it is a part, an organ, a system, and finally the organism.
3. The concept of entities. Each layer consists of entities. For example, the organism layer has only one entity—the organism itself. However, a single document can describe multiple organisms, which is necessary to describe phenomena such as the division of unicellular organisms, pregnancy, symbionts, and parasite infections. At the system level, each system is an entity. At the organ level, each organ is an entity. When we refer to "organism entities," we mean all entities of each layer. These can simultaneously be organelles, cells, organs, and systems.
4. Arbitrary allocation of entities. A particular system may be detailed down to the Organelle layer; this does not mean that other systems must be described to the same layer. On the contrary, other entities may not be described at all. Their functions (of the undisclosed systems) can be attributed to the organism as a whole.
5. Do not specify the main characteristics directly with numbers. For example, we do not state that a muscle's strength is "10". Instead, we indicate how many resources the muscle consumes and releases, and how many resources the organism as a whole consumes and releases. The world's system, which contains this organism, calculates strength at each moment based on the world's chemistry, on how many resources the circulatory system delivers to the muscle, and how many waste products the lymphatic system manages to remove. If such systems do not exist, and other systems/organs/cells/organelles also consume and release substances, resulting in a situation where all organs/cells/systems are deprived of nutrients and waste products are not removed in time, penalties are distributed to the organism's entities according to the world's rules.
6. Each entity must contain a certain amount of substance (the &lt;composition&gt; element). This serves two purposes. First, to ensure that the substance in the world does not decrease or increase during the organism's life processes but is only transformed from one form to another through the world's chemistry with the release and absorption of energy. Second, to accurately calculate the amount of substance that needs to be returned to the world in the event of the organism's death.
7. Since the OMXML format does not describe the genome but only the applied level of the organism, it is natural that the XML created by an external DNA system will most often be invalid according to the OMXML standard. This is considered normal and reflects the real state of affairs in evolution, where nature does not always follow the most optimal path. Because the document will be parsed by the world system, it is assumed that the world system will be able to read an invalid OMXML document, executing what it can comprehend from it, similar to a browser that will display any HTML document, even if it is invalid.

## Use Cases

You might want to explore different branches of evolution and seek answers to "What if..." questions.

- What if there were three sexes?
- What if Genestealers from Warhammer 40,000 actually existed?
- How would the population size of two-sex predators differ from that of three-sex predators?

## Why Not JSON

One of the advantages of XML over JSON is its ability to represent even invalid documents. Evolution often does not choose the most optimal paths. It is common for a segment of DNA to code for a protein that has no impact on the organism's development. Consequently, an XML document may be invalid but still describe a viable organism.

For example, this code can be displayed by a browser even though it is invalid:

```xml
<sexes>
    <sex id="sex_female" name="Female">
        <sexualOrganRef id="org_femaleSex"/>
    </sex>
    <sex id="sex_primaMale" name="Prima-male">
        <sexualOrganRef id="org_primaMaleSex"/>
    </sex>
    <sex id="sex_secundaMale" name="Secunda-male">
        <sexualOrganRef id="org_secundaMaleSex"/>
    </sex>
    <<!<not valid code/>>
</sexes>
```

In contrast, JSON cannot be read by standard tools if any part of it is invalid. Moreover, it is very difficult (but possible) to create a parser that separates valid sections from invalid ones:

```json
{
    "sexes": {
        "sex": [
            {
                "id": "sex_female",
                "name": "Female",
                "sexualOrganRef": {
                    "id": "org_femaleSex"
                }
            },
            {
                "id": "sex_primaMale",
                "name": "Prima-male",
                "sexualOrganRef": {
                    "id": "org_primaMaleSex"
                }
            },
            {
                "id": "sex_secundaMale",
                "name": "Secunda-male",
                "sexualOrganRef": {
                    "id": "org_secundaMaleSex"
                }
            }
        ],
        "not valid: code,
    }
]
    }
}
```

## Usage

It is assumed that you have a DNA compiler that converts OMXML code into your DNA format and vice versa, DNA into OMXML format. First, you describe an organism in the OMXML format. Then, using your DNA compiler, you encode the initial organism. Since an OMXML document describes a single individual, your compiler must be able to mark specific sections (where concrete numbers are encoded) as random numbers within a defined range. This is necessary to ensure the initial population has some variability in its characteristics, as the individual you initially create may not be viable in the conditions of your world.

Once you have the DNA that can generate an initial population, you can begin exploring a new world with new creatures.

## Roadmap

- 0.2.0 - 0.3.0: Ability to exchange substances with a new organism (or organisms) in cases of pregnancy or parasitic infection.
- 0.3.0 - 0.4.0: Detailed representation at the systems and organs level.
- 0.5.0 - 0.6.0: Interaction between systems represented at the system level and systems represented at the organ level.
- ???: Plans do not extend that far yet.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Suggestions

Suggestions for improving the format are accepted via Telegram at @bravored or email at webestet@gmail.com.
