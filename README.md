# Organism Model XML (OMXML)

> This README is available in other languages:
> - [Русский](README.ru.md)

## Project Goal

The goal of this project is to create an XML format that allows describing biological organisms at various levels. The levels supported by the schema include: Systems (musculoskeletal, digestive, nervous, etc.), Organs, Cells, and Organelles. It is not mandatory to describe an organism at the organelle level. For minimal use, it is sufficient to describe an organism at the system level. If you wish to simulate evolution focusing on specific organs, you can describe those at the cellular level, while keeping other systems at the organism-level systems. In computer simulations of evolution, OMXML serves as the equivalent of amino acids and proteins.

Moreover, you can begin evolution with organisms described at the Systems level and later intervene to detail specific systems down to sets of organs or even cells. For example, when a species stabilizes, and the majority of individuals become viable, you can focus on a particular system of the organism and further detail it. Systems detailed to organs or cells will produce/store/transport the same amount of hormones/substances as the higher-level Systems did before intervention. This approach can save processing time. Your planet will thank you! :)

## Genome

Organism Model XML does not include genes. It is assumed that you will create your own encoding system that simulates genes, with OMXML documents being the output of genome execution on a computer.

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

- 0.1.0 - 0.2.0: External signals from the environment to Organism. Actions: how Organism influences the environment. Internal signals: interactions between Cells, Organs and Systems in Organism.
- 0.2.0 - 0.3.0: Improvements at the chemical level. An optional feature will be introduced to specify the exact chemical reactions used for substance transformations in some systems.
- 0.3.0 - 0.4.0: Detailed representation at the systems and organs level.
- 0.5.0 - 0.6.0: Interaction between systems represented at the system level and systems represented at the organ level.
- ???: Plans do not extend that far yet.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Suggestions

Suggestions for improving the format are accepted via Telegram at @bravored or email at webestet@gmail.com.
